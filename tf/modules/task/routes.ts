import { Router } from "express"

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "./controller.js"

import {
  createTaskSchema,
  taskFiltersSchema,
  taskIdSchema,
  updateTaskSchema,
} from "./validator.js"

import { validate } from "../../middleware/validate.middleware.js"

import { authMiddleware } from "../auth/middleware.js"

import { IRoute } from "../../routes/route.interface.js"

const router = Router()

router.post(
  "/",
  authMiddleware,
  validate({
    body: createTaskSchema,
  }),
  createTask
)

router.get(
  "/",
  authMiddleware,
  validate({
    query: taskFiltersSchema,
  }),
  getTasks
)

router.get(
  "/:id",
  authMiddleware,
  validate({
    params: taskIdSchema,
  }),
  getTaskById
)

router.patch(
  "/:id",
  authMiddleware,
  validate({
    params: taskIdSchema,

    body: updateTaskSchema,
  }),
  updateTask
)

router.delete(
  "/:id",
  authMiddleware,
  validate({
    params: taskIdSchema,
  }),
  deleteTask
)

export const taskRoute: IRoute = {
  path: "/tasks",
  router,
}
