/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,startTime,endTime,labId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teachingDepartmentId,periodNumber,day]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coursesId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "coursesId" TEXT NOT NULL,
ADD COLUMN     "labId" TEXT NOT NULL,
ADD COLUMN     "periods" "PeriodNumber"[];

-- AlterTable
ALTER TABLE "TimeTable" ALTER COLUMN "endTime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_key" ON "Departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_date_startTime_endTime_labId_key" ON "Reservation"("date", "startTime", "endTime", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_day_key" ON "TimeTable"("userId", "teachingDepartmentId", "periodNumber", "day");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
