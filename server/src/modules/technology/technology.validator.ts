import z from "zod";
import { Category } from "@prisma/client";

export const tech_schema = z.object({
  name: z
    .string()
    .min(2, "Technology Name Must Be minimum ")
    .transform((val) => val.trim().toLowerCase().replace(/\s+/g, " ")),
  category: z.enum(Object.values(Category) as [string, ...string[]]),
});
