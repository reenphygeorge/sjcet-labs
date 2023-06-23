/*
  Warnings:

  - A unique constraint covering the columns `[dayId,labId,period,semester,batch]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reservation_date_labId_period_semester_batch_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_dayId_labId_period_semester_batch_key" ON "Reservation"("dayId", "labId", "period", "semester", "batch");
