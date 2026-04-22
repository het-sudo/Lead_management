import z from "zod";
import { Prisma, Status } from "@prisma/client";

export const developerSchema = z
  .object({
    developer_name: z
      .string()
      .min(2, "Developer name must be at least 2 characters")
      .max(50, "Name too long")
      .transform((val) => val.trim().replace(/\s+/g, " ")),

    email: z.string().email("Invalid email format").optional(),

    number: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    position: z.string().trim().min(2).max(50),

    beforeJoinExpYear: z.number().int().min(0).max(50).optional(),

    beforeJoinExpMonth: z.number().int().min(0).max(11).optional(),

    status: z.nativeEnum(Status).optional(),

    tech_ids: z
      .array(z.string().cuid("Invalid technology ID"))
      .min(1, "At least one technology is required"),

    relivingDate: z.coerce.date().optional(),

    salary: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((val) => val >= 0, "Salary must be non-negative")
      .optional(),
  })

  .refine(
    (data) => {
      if (
        data.beforeJoinExpYear !== undefined &&
        data.beforeJoinExpMonth === undefined
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Month is required when year is provided",
      path: ["beforeJoinExpMonth"],
    },
  );
