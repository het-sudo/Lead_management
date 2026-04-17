-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'DATA_SCIENCE', 'LIBRARIES');

-- CreateTable
CREATE TABLE "Technology" (
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("name")
);
