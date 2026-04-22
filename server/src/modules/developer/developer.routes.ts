import { Router } from "express";
import { IRoute } from "../../common/interface/route.interface";
import validate from "express-zod-safe";
import { developerSchema } from "./developer.validator";
import { createDeveloper, getDeveloper } from "./developer.controller";

const router = Router();
router.post("/", validate({ body: developerSchema }), createDeveloper);
router.get("/", getDeveloper);

export const DevRoute: IRoute = {
  path: "/developer",
  router: router,
};
