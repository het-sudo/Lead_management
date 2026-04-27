import { z } from "zod";
import { Status } from "@prisma/client";

const baseSchema = z.object({
  developer_name: z
    .string()
    .min(2)
    .max(50)
    .transform((v) => v.trim().replace(/\s+/g, " ")),

  email: z.string().email("Invalid email format"),

  number: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  position: z.string().min(2).max(50),

  beforeJoinExpYear: z.number().int().min(0).max(50).optional(),

  beforeJoinExpMonth: z.number().int().min(0).max(11).optional(),

  status: z.nativeEnum(Status).optional(),

  tech_ids: z.array(z.string().cuid()).min(1),

  relivingDate: z.coerce.date().optional(),

  joining_date: z.coerce.date(),

  salary: z.coerce.number().min(0).optional(),
});

export const developerSchema = baseSchema;

export const updateDeveloperSchema = z.object({
  developer_name: z.string().min(2).optional(),
  position: z.string().optional(),
  beforeJoinExpYear: z.number().int().min(0).optional(),
  beforeJoinExpMonth: z.number().int().min(0).max(11).optional(),
  status: z.nativeEnum(Status).optional(),
  relivingDate: z.coerce.date().optional(),
  salary: z.coerce.number().min(0).optional(),
  tech_ids: z.array(z.string().cuid()).optional(),
});

export const getDevelopersSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  search: z.string().optional(),
});

export const deleteDeveloperSchema = z.object({
  id: z.string().cuid(),
});
