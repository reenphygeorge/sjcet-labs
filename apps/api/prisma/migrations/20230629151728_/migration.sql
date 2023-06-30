/*
  Warnings:

  - You are about to drop the column `labName` on the `AttendanceRecord` table. All the data in the column will be lost.
  - You are about to drop the column `labName` on the `LabTimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `genderName` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,labId,periods]` on the table `AttendanceRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId,semester,batch,periodNumber,dayId,labId]` on the table `LabTimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labId` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labId` to the `LabTimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "AttendanceRecord_labName_fkey";

-- DropForeignKey
ALTER TABLE "LabTimeTable" DROP CONSTRAINT "LabTimeTable_labName_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_labId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_labId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_genderName_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_labId_fkey";

-- DropIndex
DROP INDEX "AttendanceRecord_date_labName_periods_key";

-- DropIndex
DROP INDEX "LabTimeTable_departmentId_semester_batch_periodNumber_dayId_key";

-- AlterTable
ALTER TABLE "AttendanceRecord" DROP COLUMN "labName",
ADD COLUMN     "labId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LabTimeTable" DROP COLUMN "labName",
ADD COLUMN     "labId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "genderName",
ADD COLUMN     "gender" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labId_periods_key" ON "AttendanceRecord"("date", "labId", "periods");

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_departmentId_semester_batch_periodNumber_dayId_key" ON "LabTimeTable"("departmentId", "semester", "batch", "periodNumber", "dayId", "labId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
