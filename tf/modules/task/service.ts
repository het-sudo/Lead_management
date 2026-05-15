import { PrismaClient, type Prisma } from "@prisma/client"
import {
  CreateTaskInput,
  TaskFiltersInput,
  UpdateTaskInput,
} from "./validator.js"

const prisma = new PrismaClient()

export async function createTaskService(
  ownerId: string,
  data: CreateTaskInput
) {
  return prisma.task.create({
    data: {
      ...data,
      ownerId,
    },
  })
}

export async function getTasksService(
  ownerId: string,
  filters: TaskFiltersInput
) {
  const { status, priority, category, search, page, limit } = filters

  const where: Prisma.TaskWhereInput = {
    ownerId,
    deletedAt: null,
  }

  if (status) {
    where.status = status
  }

  if (priority) {
    where.priority = priority
  }

  if (category) {
    where.category = {
      equals: category,
      mode: "insensitive",
    }
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ]
  }

  const skip = (page - 1) * limit

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip,

      take: limit,
    }),

    prisma.task.count({
      where,
    }),
  ])

  return {
    tasks,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export async function getTaskByIdService(ownerId: string, taskId: string) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
    },
  })
}
export async function updateTaskService(
  ownerId: string,
  taskId: string,
  data: UpdateTaskInput
) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
      deletedAt: null,
    },
  })

  if (!task) {
    return null
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },

    data,
  })
}
export async function deleteTaskService(ownerId: string, taskId: string) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      ownerId,
    },
  })

  if (!task) {
    return null
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      deletedAt: new Date(),
    },
  })
}
