import { z } from "zod";

export const CreateTechSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type CreateTechInput = z.infer<typeof CreateTechSchema>;

// export interface CreateTechInput {
//   id: string;
//   name: string;
//   category: string;
// }
