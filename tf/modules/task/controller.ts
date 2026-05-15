import { StatusCodes } from "http-status-codes"
import { Response } from "express"

import asyncHandler from "../../utils/asyncHandler.js"
import logger from "../../utils/logger.js"
import sendResponse from "../../utils/sendResponse.js"
import ApiError from "../../utils/apiError.js"

import {
  createTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
  updateTaskService,
} from "./service.js"

import { AuthRequest } from "../auth/middleware.js"
import {
  CreateTaskInput,
  TaskFiltersInput,
  TaskIdInput,
  UpdateTaskInput,
} from "./validator.js"

export const createTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    logger.info("create task request received", {
      userId: req.user?.userId,
    })

    const task = await createTaskService(
      req.user!.userId,
      req.validated.body as CreateTaskInput
    )

    logger.info("task created successfully", {
      taskId: task.id,
      userId: req.user?.userId,
    })

    return sendResponse(
      res,
      StatusCodes.CREATED,
      "Task created successfully",
      task
    )
  }
)

export const getTasks = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    logger.info("get tasks request received", {
      userId: req.user?.userId,
    })

    const result = await getTasksService(
      req.user!.userId,
      req.validated.query as TaskFiltersInput
    )

    logger.info("tasks fetched successfully", {
      userId: req.user?.userId,
    })

    return sendResponse(
      res,
      StatusCodes.OK,
      "Tasks fetched successfully",
      result
    )
  }
)

export const getTaskById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    logger.info("get task request received", {
      taskId: req.params.id,
      userId: req.user?.userId,
    })

    const { id } = req.validated.params as TaskIdInput
    const task = await getTaskByIdService(req.user!.userId, id)

    if (!task) {
      logger.warn("task not found", {
        taskId: req.params.id,
        userId: req.user?.userId,
      })

      throw new ApiError(StatusCodes.NOT_FOUND, "Task not found")
    }

    return sendResponse(res, StatusCodes.OK, "Task fetched successfully", task)
  }
)

export const updateTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    logger.info("update task request received", {
      taskId: req.params.id,
      userId: req.user?.userId,
    })
    const { id } = req.validated.params as TaskIdInput
    const task = await updateTaskService(
      req.user!.userId,
      id,
      req.validated.body as UpdateTaskInput
    )

    if (!task) {
      logger.warn("task not found for update", {
        taskId: req.params.id,
        userId: req.user?.userId,
      })

      throw new ApiError(StatusCodes.NOT_FOUND, "Task not found")
    }

    logger.info("task updated successfully", {
      taskId: task.id,
      userId: req.user?.userId,
    })

    return sendResponse(res, StatusCodes.OK, "Task updated successfully", task)
  }
)

export const deleteTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    logger.info("delete task request received", {
      taskId: req.params.id,
      userId: req.user?.userId,
    })
    const { id } = req.validated.params as TaskIdInput
    const task = await deleteTaskService(req.user!.userId, id)

    if (!task) {
      logger.warn("task not found for deletion", {
        taskId: req.params.id,
        userId: req.user?.userId,
      })

      throw new ApiError(StatusCodes.NOT_FOUND, "Task not found")
    }

    logger.info("task deleted successfully", {
      taskId: req.params.id,
      userId: req.user?.userId,
    })

    return sendResponse(res, StatusCodes.OK, "Task deleted successfully")
  }
)
