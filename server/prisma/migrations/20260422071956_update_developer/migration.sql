/*
  Warnings:

  - You are about to drop the column `experience` on the `developerTeam` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'OnLeave', 'isActive');

-- AlterTable
ALTER TABLE "developerTeam" DROP COLUMN "experience",
ADD COLUMN     "beforeJoinExpMonth" INTEGER,
ADD COLUMN     "beforeJoinExpYear" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relivingDate" TIMESTAMP(3),
ADD COLUMN     "salary" DECIMAL(65,30),
ADD COLUMN     "status" "Status",
ALTER COLUMN "joining_date" SET DEFAULT CURRENT_TIMESTAMP;
