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

export const getAllTechnology = async () => {
  return await prisma.technology.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });
};
