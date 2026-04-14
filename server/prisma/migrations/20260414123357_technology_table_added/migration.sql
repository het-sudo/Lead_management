-- CreateEnum
CREATE TYPE "Tech_Stack" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'DATA_SCIENCE', 'LIBRARIES');

-- CreateTable
CREATE TABLE "Technology" (
    "name" TEXT NOT NULL,
    "category" "Tech_Stack" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("name")
);
