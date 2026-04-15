import { Router } from "express";
import { tech_schema } from "./technology.validator";
import { create_technology, get_all_technology } from "./technology.controller";
import { IRoute } from "../../common/interface/route.interface";
import validate from "express-zod-safe";

const router = Router();
router.post("/", validate({ body: tech_schema }), create_technology);
router.get("/", get_all_technology);

export const TechRoute: IRoute = {
  path: "/technology",
  router: router,
};
