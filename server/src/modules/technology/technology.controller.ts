import { NextFunction, Response, Request } from "express";
import asyncHandler from "../../common/utils/asyncHandler";
import { tech_schema } from "./technology.validator";
import * as techService from "../technology/technology.service";
import { success } from "zod";
import { ValidatedRequest } from "express-zod-safe";
import { da } from "zod/v4/locales";
import { count } from "node:console";

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

//API - GET ALL TECHNOLOGIES

export const get_all_technology = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const { data, totalCount } = await techService.getAllTechnology(
      limit,
      page,
    );

    res.status(200).json({
      success: true,
      message: "Technologies fetched successfully",
      data: data,
      meta: {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  },
);

//API - DELETE

export const delete_Technology = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params.id;

    const deleted = await techService.deleteTechnology(id);

    res.status(200).json({
      success: true,
      message: `Deleted technology `,
      data: deleted,
    });
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
