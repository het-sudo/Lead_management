import { Prisma } from "@prisma/client";
import { developerInput } from "./developer.interface";
import prisma from "../../db/prisma";
import { logger } from "../../common/utils/loggers";
import ApiError from "../../common/errors/ApiError";

//Create Developers

export const createDeveloper = async (data: developerInput) => {
  const existingDev = await prisma.developerTeam.findUnique({
    where: { email: data.email },
  });

  if (existingDev && existingDev.isDeleted === false) {
    throw new ApiError(400, "Developer with this email already exists");
  }

  const technologies = await prisma.technology.findMany({
    where: {
      id: { in: data.tech_ids },
      isDeleted: false,
    },
    select: { id: true },
  });

  if (technologies.length !== data.tech_ids.length) {
    throw new ApiError(400, "Some technology IDs are invalid");
  }

  const developer = await prisma.developerTeam.create({
    data: {
      developer_name: data.developer_name,
      email: data.email,
      number: data.number,
      position: data.position,
      beforeJoinExpYear: data.beforeJoinExpYear,
      beforeJoinExpMonth: data.beforeJoinExpMonth,
      status: data.status,
      relivingDate: data.relivingDate,
      salary: data.salary,
      tech_skills: {
        create: data.tech_ids.map((id) => ({
          technology: {
            connect: { id },
          },
        })),
      },
      isDeleted: false,
    },
  });
  return {
    ...developer,
    tech_ids: data.tech_ids,
  };
};

//API GET ALL Developers

export const getDevelopers = async (limit: number, page: number) => {
  const skip = (page - 1) * limit;

  return Promise.all([
    prisma.developerTeam.findMany({
      take: limit,
      skip: skip,
      where: { isDeleted: false },
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
    prisma.developerTeam.count({
      where: { isDeleted: false },
    }),
  ]).then(([data, totalCount]) => {
    return { data, totalCount };
  });
};
