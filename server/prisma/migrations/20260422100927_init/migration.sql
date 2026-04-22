/*
  Warnings:

  - The values [isActive] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[dev_id,tech_id]` on the table `dev_skills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `developerTeam` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `developerTeam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Active', 'OnLeave', 'InActive');
ALTER TABLE "developerTeam" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "developerTeam" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Active';

-- CreateIndex
CREATE UNIQUE INDEX "dev_skills_dev_id_tech_id_key" ON "dev_skills"("dev_id", "tech_id");

-- CreateIndex
CREATE UNIQUE INDEX "developerTeam_email_key" ON "developerTeam"("email");
