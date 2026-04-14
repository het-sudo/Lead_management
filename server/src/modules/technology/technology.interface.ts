import z from "zod";
import { tech_schema } from "./technology.validator";

export type Technology_input = z.infer<typeof tech_schema>;
