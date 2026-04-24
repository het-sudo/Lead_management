import { Request, Response } from "express";
import asyncHandler from "../../common/utils/asyncHandler";
import * as devService from "./developer.service";
import {
  developerSchema,
  updateDeveloperSchema,
  getDevelopersSchema,
  deleteDeveloperSchema,
} from "./developer.validator";
import { ApiResponse } from "../../common/utils/ApiResponse";

// CREATE
export const createDeveloper = asyncHandler(async (req, res) => {
  const body = developerSchema.parse(req.body);

  const result = await devService.createDeveloper(body);

  res.status(201).json(new ApiResponse(201, result, "Created"));
});

// GET
export const getDevelopers = asyncHandler(async (req, res) => {
  const query = getDevelopersSchema.parse(req.query);

  const result = await devService.getDevelopers(
    query.limit,
    query.page,
    query.search,
  );

  res.status(200).json(
    new ApiResponse(200, result.data, "Fetched", {
      totalCount: result.totalCount,
      currentPage: query.page,
      totalPages: Math.ceil(result.totalCount / query.limit),
    }),
  );
});

// DELETE
export const deleteDeveloper = asyncHandler(async (req, res) => {
  const { id } = deleteDeveloperSchema.parse(req.params);

  const result = await devService.deleteDeveloper(id);

  res.status(200).json(new ApiResponse(200, result, "Deleted"));
});

// UPDATE
export const updateDeveloper = asyncHandler(async (req, res) => {
  const { id } = deleteDeveloperSchema.parse(req.params);

  const body = updateDeveloperSchema.parse(req.body);

  const result = await devService.updateDeveloper(id, body);

  res.status(200).json(new ApiResponse(200, result, "Updated"));
});
