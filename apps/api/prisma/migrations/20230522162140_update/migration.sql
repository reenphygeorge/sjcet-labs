/*
  Warnings:

  - You are about to drop the column `deptId` on the `Professors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `UsageStatistics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Professors_departmentId_key";

-- AlterTable
ALTER TABLE "Professors" DROP COLUMN "deptId";

-- CreateIndex
CREATE UNIQUE INDEX "UsageStatistics_id_key" ON "UsageStatistics"("id");
