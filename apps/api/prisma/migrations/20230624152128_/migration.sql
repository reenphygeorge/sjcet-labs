/*
  Warnings:

  - You are about to drop the column `period` on the `Reservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dayId,labId,periods,semester,batch,teachingDepartmentsId,professorId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reservation_dayId_labId_period_semester_batch_teachingDepar_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "period",
ADD COLUMN     "periods" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_dayId_labId_periods_semester_batch_teachingDepa_key" ON "Reservation"("dayId", "labId", "periods", "semester", "batch", "teachingDepartmentsId", "professorId");
