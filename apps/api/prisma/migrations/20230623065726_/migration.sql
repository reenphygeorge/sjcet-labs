/*
  Warnings:

  - A unique constraint covering the columns `[userId,departmentId,semester,batch,periodNumber,dayId]` on the table `LabTimeTable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,labId,period,semester,batch]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teachingDepartmentId,periodNumber,batch,semester,dayId]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reservation_date_labId_period_key";

-- DropIndex
DROP INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_batch_key";

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_userId_departmentId_semester_batch_periodNumbe_key" ON "LabTimeTable"("userId", "departmentId", "semester", "batch", "periodNumber", "dayId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_date_labId_period_semester_batch_key" ON "Reservation"("date", "labId", "period", "semester", "batch");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_batch_se_key" ON "TimeTable"("userId", "teachingDepartmentId", "periodNumber", "batch", "semester", "dayId");
