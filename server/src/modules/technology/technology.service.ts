import { PrismaClient } from "@prisma/client";
import { Technology_input } from "./technology.interface";
import ApiError from "../../common/errors/ApiError";

const prisma = new PrismaClient();

// API - CREATE TECHNOLOGY

export const createTechnology = async (data: Technology_input) => {
  const existingTech = await prisma.technology.findUnique({
    where: { name: data.name },
  });

  if (existingTech) {
    throw new ApiError(400, "Technology with this name already exists");
  }

  return await prisma.technology.create({
    data: {
      name: data.name,
      category: data.category,
    },
  });
};

//API GET ALL TECHNOLOGIES

export const getAllTechnology = async (limit: number, page: number) => {
  const skip = (page - 1) * limit;

  const data = await prisma.technology.findMany({
    take: limit,
    skip: skip,
    where: { isDeleted: false },
    orderBy: { name: "asc" },
  });

  const totalCount = await prisma.technology.count({
    where: { isDeleted: false },
  });

  return { data, totalCount };
};

//API - DELETE

export const deleteTechnology = async (id: string) => {
  const exist = await prisma.technology.findUnique({
    where: { id: id },
  });

  if (!exist) {
    throw new ApiError(404, "Technology doesn't exist");
  }

  return await prisma.technology.update({
    where: { id: id },
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
