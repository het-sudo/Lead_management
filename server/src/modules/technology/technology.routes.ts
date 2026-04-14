import { Router } from "express";
import validate from "express-zod-safe";
import { tech_schema } from "./technology.validator";
import { create_technology } from "./technology.controller";
import { IRoute } from "../../common/interface/route.interface";

const router = Router();
router.post("/", validate(tech_schema), create_technology);

export const TechRoute: IRoute = {
  path: "/technology",
  router: router,
};
