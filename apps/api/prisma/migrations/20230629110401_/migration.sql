/*
  Warnings:

  - You are about to drop the column `batch` on the `Departments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Departments_name_batch_key";

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "batch";

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_key" ON "Departments"("name");
