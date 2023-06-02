/*
  Warnings:

  - You are about to drop the column `attendanceRecordId` on the `TimeTable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,labId,periods]` on the table `AttendanceRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeTableId` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_attendanceRecordId_fkey";

-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "timeTableId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "attendanceRecordId";

-- CreateTable
CREATE TABLE "StudentPositions" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "studentId" TEXT NOT NULL,
    "systemNumber" INTEGER NOT NULL,
    "attendanceRecordId" TEXT NOT NULL,

    CONSTRAINT "StudentPositions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentPositions_id_key" ON "StudentPositions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPositions_studentId_systemNumber_key" ON "StudentPositions"("studentId", "systemNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labId_periods_key" ON "AttendanceRecord"("date", "labId", "periods");

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "TimeTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
