import z from "zod";
import { Tech_Stack } from "@prisma/client";

export const tech_schema = z.object({
  name: z
    .string()
    .min(2, "Technology Name Must Be minimum ")
    .transform((val) => val.trim().toLowerCase().replace(/\s+/g, " ")),
  category: z.enum(Object.values(Tech_Stack) as [string, ...string[]]),
});
