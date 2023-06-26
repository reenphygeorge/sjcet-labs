/*
  Warnings:

  - A unique constraint covering the columns `[userId,teachingDepartmentId,periodNumber,batch]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_batch_key" ON "TimeTable"("userId", "teachingDepartmentId", "periodNumber", "batch");
