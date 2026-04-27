import { Category, PrismaClient } from "@prisma/client";
import { technologyInput } from "./technology.interface";
import ApiError from "../../common/errors/ApiError";
import { logger } from "../../common/utils/loggers";

const prisma = new PrismaClient();

// API - CREATE TECHNOLOGY

export const createTechnology = async (data: technologyInput) => {
  const existingTech = await prisma.technology.findUnique({
    where: { name: data.name },
  });

  if (existingTech && existingTech.isDeleted === false) {
    logger.warn("Technology with this name already exists");
    throw new ApiError(400, "Technology with this name already exists");
  }

  return await prisma.technology.create({
    data: {
      name: data.name,
      category: data.category,
      isDeleted: false,
    },
  });
};
//API GET CATEGORIES

//API GET ALL TECHNOLOGIES

export const getAllTechnology = async (
  limit: number,
  page: number,
  search?: string,
) => {
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }
  return Promise.all([
    prisma.technology.findMany({
      take: limit,
      skip: skip,
      where,
      orderBy: { createdAt: "desc" },
    }),
    prisma.technology.count({
      where,
    }),
  ]).then(([data, totalCount]) => {
    return { data, totalCount };
  });
};
//API - GET CATEGORIES

export const getAllCategories = async () => {
  return Object.values(Category);
};

//API - DELETE

export const deleteTechnology = async (id: string) => {
  const exist = await prisma.technology.findUnique({
    where: { id },
  });

  if (!exist || exist.isDeleted === true) {
    throw new ApiError(404, "Technology doesn't exist");
  }

  return await prisma.technology.update({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
};

// export const getAllTechnology = async (
//   limit: number,
//   cursor?: string,
//   page?: number,
// ) => {
//   const where = { isDeleted: false };
//   const orderBy = { name: "asc" } as const;

//   if (page) {
//     const skip = (page - 1) * limit;
//     const [data, totalCount] = await prisma.$transaction([
//       prisma.technology.findMany({ take: limit, skip, where, orderBy }),
//       prisma.technology.count({ where }),
//     ]);
//     return { data, totalCount, type: "offset" };
//   }

//   const data = await prisma.technology.findMany({
//     take: limit,
//     skip: cursor ? 1 : 0,
//     cursor: cursor ? { name: cursor } : undefined,
//     where,
//     orderBy,
//   });
//   return { data, type: "cursor" };
// };
