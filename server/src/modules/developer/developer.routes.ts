import { Router } from "express";
import { IRoute } from "../../common/interface/route.interface";
import validate from "express-zod-safe";
import { developerSchema, updateDeveloperSchema } from "./developer.validator";
import {
  createDeveloper,
  deleteDeveloper,
  getDevelopers,
  updateDeveloper,
} from "./developer.controller";

const router = Router();
router.post("/", validate({ body: developerSchema }), createDeveloper);
router.get("/", getDevelopers);
router.delete("/:id", deleteDeveloper);
router.patch("/:id", updateDeveloper);

export const DevRoute: IRoute = {
  path: "/developer",
  router: router,
};
