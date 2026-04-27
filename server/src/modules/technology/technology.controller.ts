import { Response, Request } from "express";
import asyncHandler from "../../common/utils/asyncHandler";
import { tech_schema } from "./technology.validator";
import * as techService from "../technology/technology.service";
import { ValidatedRequest } from "express-zod-safe";
import { ApiResponse } from "../../common/utils/ApiResponse";
import { Category } from "@prisma/client";

// API - CREATE TECHNOLOGY

export const createTechnology = asyncHandler(
  async (
    req: ValidatedRequest<{ body: typeof tech_schema }>,
    res: Response,
  ) => {
    const newTech = await techService.createTechnology(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, newTech, "Technology added successfully!"));
  },
);

//API - GET ALL TECHNOLOGIES

export const getTechnology = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const search = (req.query.search as string) || "";

    const { data, totalCount } = await techService.getAllTechnology(
      limit,
      page,
      search,
    );
    res.status(200).json(
      new ApiResponse(200, data, "Technologies fetched successfully", {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      }),
    );
  },
);

//API - GET ALL CATEGORIES

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await techService.getAllCategories();

    res
      .status(200)
      .json(
        new ApiResponse(200, categories, "Categories fetched successfully"),
      );
  },
);

//API - DELETE

export const deleteTechnology = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await techService.deleteTechnology(id as string);

    res.status(200).json(new ApiResponse(200, deleted, "Technology Deleted!"));
  },
);

// export const get_all_technology = asyncHandler(
//   async (req: Request, res: Response) => {
//     const limit = parseInt(req.query.limit as string) || 10;
//     const page = req.query.page
//       ? parseInt(req.query.page as string)
//       : undefined;
//     const cursor = req.query.cursor as string;

//     const result = await techService.getAllTechnology(limit, cursor, page);

//     let meta: any = { limit, count: result.data.length };

//     if (result.type === "offset") {
//       meta.currentPage = page;
//       meta.totalPages = Math.ceil((result.totalCount || 0) / limit);
//       meta.totalCount = result.totalCount;
//     } else {
//       meta.nextcursor =
//         result.data.length === limit
//           ? result.data[result.data.length - 1].name
//           : null;
//     }

//     res.status(200).json({
//       success: true,
//       message: `Technologies Fetched Sucessfully`,
//       data: result.data,
//       meta,
//     });
//   },
// );
