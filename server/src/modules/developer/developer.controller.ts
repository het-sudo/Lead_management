import { ValidatedRequest } from "express-zod-safe";
import asyncHandler from "../../common/utils/asyncHandler";
import { developerSchema } from "./developer.validator";
import * as devService from "../developer/developer.service";
import { ApiResponse } from "../../common/utils/ApiResponse";
import { Request, Response } from "express";

export const createDeveloper = asyncHandler(
  async (
    req: ValidatedRequest<{ body: typeof developerSchema }>,
    res: Response,
  ) => {
    const newTech = await devService.createDeveloper(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, newTech, "Developer added successfully!"));
  },
);

export const getDeveloper = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const { data, totalCount } = await devService.getDevelopers(limit, page);
    res.status(200).json(
      new ApiResponse(200, data, "Developers fetched successfully", {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      }),
    );
  },
);
