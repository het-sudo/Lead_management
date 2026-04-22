/*
  Warnings:

  - Added the required column `number` to the `developerTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "developerTeam" ADD COLUMN     "number" BIGINT NOT NULL;
