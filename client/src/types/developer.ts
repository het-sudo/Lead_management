import { z } from "zod";

const baseSchema = z.object({
  id: z.string().optional(),
  developer_name: z
    .string()
    .min(2)
    .max(50)
    .transform((v) => v.trim().replace(/\s+/g, " ")),

  email: z.string().email("Invalid email format"),

  number: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  position: z.string().min(2).max(50),

  beforeJoinExpYear: z.number().int().min(0).max(50).optional(),
  status: z.string().optional(),

  beforeJoinExpMonth: z.number().int().min(0).max(11).optional(),

  joining_date: z.coerce.date().optional(),

  tech_ids: z.array(z.string().cuid()).min(1),

  salary: z.coerce.number().min(0).optional(),
  relivingDate: z.coerce.date().optional(),
  tech_skills: z
    .array(
      z.object({
        technology: z.object({
          id: z.string(),
          name: z.string(),
        }),
      }),
    )
    .optional(),
});

export const developerSchema = baseSchema;

export const updateDeveloperSchema = z.object({
  id: z.string().optional(),
  position: z.string().optional(),
  beforeJoinExpYear: z.number().int().min(0).optional(),
  beforeJoinExpMonth: z.number().int().min(0).max(11).optional(),
  relivingDate: z.string().nullable().optional(),
  status: z.string().optional(),
  salary: z.coerce.number().min(0).optional(),
  tech_ids: z.array(z.string().cuid()).optional(),
  tech_skills: z
    .array(
      z.object({
        technology: z.object({
          id: z.string(),
          name: z.string(),
        }),
      }),
    )
    .optional(),
});

export const getDevelopersSchema = z.object({
  id: z.string(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  search: z.string().optional(),
  joining_date: z.coerce.date().optional(),
});

export const deleteDeveloperSchema = z.object({
  id: z.string().cuid(),
});

export type DeveloperInput = z.infer<typeof developerSchema>;

export type UpdateDeveloperInput = z.infer<typeof updateDeveloperSchema>;

export type GetDevelopersQuery = z.infer<typeof getDevelopersSchema>;

export type DeleteDeveloperParams = z.infer<typeof deleteDeveloperSchema>;
