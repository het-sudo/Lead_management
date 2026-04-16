import { PrismaClient } from "@prisma/client";
import { technologyInput } from "./technology.interface";
import ApiError from "../../common/errors/ApiError";

const prisma = new PrismaClient();

// API - CREATE TECHNOLOGY

export const createTechnology = async (data: technologyInput) => {
  const existingTech = await prisma.technology.findUnique({
    where: { name: data.name },
  });

  if (existingTech && existingTech.isDeleted === false) {
    console.log("Tech Exist!");
    throw new ApiError(400, "Technology with this name already exists");
  }

  if (existingTech && existingTech.isDeleted === true) {
    return await prisma.technology.update({
      where: { id: existingTech.id },
      data: {
        isDeleted: false,
        category: data.category,
        createdAt: new Date(),
      },
    });
  }

  return await prisma.technology.create({
    data: {
      name: data.name,
      category: data.category,
      isDeleted: false,
    },
  });
};

//API GET ALL TECHNOLOGIES

export const getAllTechnology = async (limit: number, page: number) => {
  const skip = (page - 1) * limit;

  return Promise.all([
    prisma.technology.findMany({
      take: limit,
      skip: skip,
      where: { isDeleted: false },
      orderBy: { name: "asc" },
    }),
    prisma.technology.count({
      where: { isDeleted: false },
    }),
  ]).then(([data, totalCount]) => {
    return { data, totalCount };
  });
};

//API - DELETE

export const deleteTechnology = async (id: string) => {
  const exist = await prisma.technology.findUnique({
    where: { id },
  });

  if (!exist) {
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
