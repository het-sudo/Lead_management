import z from "zod";

export const tech_schema = z.object({
  name: z.string().min(2, "Technology Name Must Be minimum "),
  category: z.enum([
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "TOOLS",
    "LIBRARIES",
    "DATA_SCIENCE",
  ]),
});
