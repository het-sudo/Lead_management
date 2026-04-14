import { Router } from "express";
import type { IRoute } from "../common/interface/route.interface.js";
import { TechRoute } from "../modules/technology/technology.routes.js";

const rootRouter: Router = Router();

const moduleRoutes: IRoute[] = [TechRoute];

moduleRoutes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

export default rootRouter;
