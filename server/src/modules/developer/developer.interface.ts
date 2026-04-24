import { z } from "zod";
import {
  developerSchema,
  updateDeveloperSchema,
  getDevelopersSchema,
  deleteDeveloperSchema,
} from "./developer.validator";

export type DeveloperInput = z.infer<typeof developerSchema>;

export type UpdateDeveloperInput = z.infer<typeof updateDeveloperSchema>;

export type GetDevelopersQuery = z.infer<typeof getDevelopersSchema>;

export type DeleteDeveloperParams = z.infer<typeof deleteDeveloperSchema>;
