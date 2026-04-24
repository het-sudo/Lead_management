import prisma from "../../db/prisma";
import ApiError from "../../common/errors/ApiError";
import { DeveloperInput, UpdateDeveloperInput } from "./developer.interface";
import { validateDeveloperBusinessRules } from "./developer.middleware";

export const createDeveloper = async (data: DeveloperInput) => {
  const { tech_ids, ...rest } = data;

  const [existingDev, techs] = await Promise.all([
    prisma.developerTeam.findUnique({
      where: { email: rest.email },
    }),
    prisma.technology.findMany({
      where: { id: { in: tech_ids }, isDeleted: false },
      select: { id: true },
    }),
  ]);

  if (existingDev && !existingDev.isDeleted) {
    throw new ApiError(400, "Developer already exists");
  }

  // Rehire case
  if (existingDev && existingDev.isDeleted) {
    validateDeveloperBusinessRules({ ...existingDev, ...rest });

    return prisma.developerTeam.update({
      where: { id: existingDev.id },
      data: {
        ...rest,
        isDeleted: false,
        deletedAt: null,
      },
    });
  }

  // Tech validation
  if (techs.length !== tech_ids.length) {
    throw new ApiError(400, "Invalid tech IDs");
  }

  if (new Set(tech_ids).size !== tech_ids.length) {
    throw new ApiError(400, "Duplicate tech IDs");
  }

  validateDeveloperBusinessRules(rest);

  const developer = await prisma.developerTeam.create({
    data: {
      ...rest,
      tech_skills: {
        create: tech_ids.map((id) => ({
          technology: { connect: { id } },
        })),
      },
    },
    include: {
      tech_skills: {
        select: {
          tech_id: true,
        },
      },
    },
  });

  return {
    ...developer,
  };
};
export const getDevelopers = async (
  limit: number,
  page: number,
  search?: string,
) => {
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (search) {
    where.OR = [
      { developer_name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [data, totalCount] = await Promise.all([
    prisma.developerTeam.findMany({
      take: limit,
      skip,
      where,
      orderBy: { createdAt: "desc" },
      include: {
        tech_skills: {
          select: {
            technology: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.developerTeam.count({ where: { isDeleted: false } }),
  ]);

  return { data, totalCount };
};

export const deleteDeveloper = async (id: string) => {
  const exist = await prisma.developerTeam.findUnique({ where: { id } });

  if (!exist) throw new ApiError(404, "Not found");

  if (exist.isDeleted) return exist;

  return prisma.developerTeam.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      status: "InActive",
      relivingDate: new Date(),
    },
  });
};

export const updateDeveloper = async (
  id: string,
  data: UpdateDeveloperInput,
) => {
  if (!Object.keys(data).length) {
    throw new ApiError(400, "No fields to update");
  }

  const exist = await prisma.developerTeam.findUnique({
    where: { id },
  });

  if (!exist || exist.isDeleted) {
    throw new ApiError(404, "Developer not found");
  }

  const { tech_ids, ...rest } = data;

  if (tech_ids !== undefined) {
    const techs = await prisma.technology.findMany({
      where: { id: { in: tech_ids }, isDeleted: false },
      select: { id: true },
    });

    if (techs.length !== tech_ids.length) {
      throw new ApiError(400, "Invalid tech IDs");
    }

    if (new Set(tech_ids).size !== tech_ids.length) {
      throw new ApiError(400, "Duplicate tech IDs");
    }
  }

  const cleanData = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => v !== undefined),
  );

  validateDeveloperBusinessRules({
    ...exist,
    ...cleanData,
  });

  if (tech_ids !== undefined) {
    await prisma.dev_skills.deleteMany({
      where: { dev_id: id },
    });

    if (tech_ids.length > 0) {
      await prisma.dev_skills.createMany({
        data: tech_ids.map((techId) => ({
          dev_id: id,
          tech_id: techId,
        })),
      });
    }
  }

  if (!Object.keys(cleanData).length && tech_ids === undefined) {
    throw new ApiError(400, "No valid fields to update");
  }

  const developer = await prisma.developerTeam.update({
    where: { id },
    data: cleanData,
    include: {
      tech_skills: {
        select: {
          tech_id: true,
        },
      },
    },
  });
  return {
    ...developer,
  };
};
