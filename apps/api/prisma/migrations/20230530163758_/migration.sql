/*
  Warnings:

  - Added the required column `attendanceRecordId` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "attendanceRecordId" TEXT;

-- AlterTable
ALTER TABLE "TimeTable" ADD COLUMN     "attendanceRecordId" TEXT NOT NULL,
ADD COLUMN     "labBatch" "LabBatch",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "date" TIMESTAMP(3) NOT NULL,
    "labId" TEXT NOT NULL,
    "periods" "PeriodNumber"[],

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_id_key" ON "AttendanceRecord"("id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
