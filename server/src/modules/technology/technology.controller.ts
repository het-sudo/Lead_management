import { NextFunction, Response, Request } from "express";
import asyncHandler from "../../common/utils/asyncHandler";
import { tech_schema } from "./technology.validator";
import { createTechnology } from "./technology.service";
import * as techService from "../technology/technology.service";
import { success } from "zod";
import { ValidatedRequest } from "express-zod-safe";
import { da } from "zod/v4/locales";

// API - CREATE TECHNOLOGY

export const create_technology = asyncHandler(
  async (
    req: ValidatedRequest<{ body: typeof tech_schema }>,
    res: Response,
  ) => {
    const newTech = await techService.createTechnology(req.body);

    res.status(201).json({
      success: true,
      message: "Technology Added Sucessfully",
      data: newTech,
    });
  },
);

export const get_all_technology = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await techService.getAllTechnology();

    res.status(201).json({
      success: true,
      message: "All Technology fetched sucessfully",
      data: data,
    });
  },
);
