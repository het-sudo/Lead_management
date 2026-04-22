import { Router } from "express";
import { tech_schema } from "./technology.validator";
import {
  createTechnology,
  deleteTechnology,
  getCategories,
  getTechnology,
} from "./technology.controller";
import { IRoute } from "../../common/interface/route.interface";
import validate from "express-zod-safe";

const router = Router();
router.post("/", validate({ body: tech_schema }), createTechnology);
router.get("/", getTechnology);
router.delete("/:id", deleteTechnology);
router.get("/categories", getCategories);

export const TechRoute: IRoute = {
  path: "/technology",
  router: router,
};
