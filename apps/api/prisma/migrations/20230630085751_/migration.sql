/*
  Warnings:

  - A unique constraint covering the columns `[teachingDepartmentId,periodNumber,batch,semester,dayId]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_batch_se_key";

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_teachingDepartmentId_periodNumber_batch_semester__key" ON "TimeTable"("teachingDepartmentId", "periodNumber", "batch", "semester", "dayId");
