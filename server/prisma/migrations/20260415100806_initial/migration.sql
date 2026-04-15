/*
  Warnings:

  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Technology` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Technology` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Technology_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");
