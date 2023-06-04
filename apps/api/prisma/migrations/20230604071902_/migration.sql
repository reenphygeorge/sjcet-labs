/*
  Warnings:

  - The values [Period1,Period2,Period3,Period4,Period5,Period6,Period7] on the enum `PeriodNumber` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `ReportStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `issueType` on the `Report` table. All the data in the column will be lost.
  - Made the column `issueDescription` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PeriodNumber_new" AS ENUM ('PERIOD1', 'PERIOD2', 'PERIOD3', 'PERIOD4', 'PERIOD5', 'PERIOD6', 'PERIOD7');
ALTER TABLE "Reservation" ALTER COLUMN "period" TYPE "PeriodNumber_new" USING ("period"::text::"PeriodNumber_new");
ALTER TABLE "TimeTable" ALTER COLUMN "periodNumber" TYPE "PeriodNumber_new" USING ("periodNumber"::text::"PeriodNumber_new");
ALTER TABLE "AttendanceRecord" ALTER COLUMN "periods" TYPE "PeriodNumber_new"[] USING ("periods"::text::"PeriodNumber_new"[]);
ALTER TYPE "PeriodNumber" RENAME TO "PeriodNumber_old";
ALTER TYPE "PeriodNumber_new" RENAME TO "PeriodNumber";
DROP TYPE "PeriodNumber_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReportStatus_new" AS ENUM ('PENDING', 'SOLVED');
ALTER TABLE "Report" ALTER COLUMN "status" TYPE "ReportStatus_new" USING ("status"::text::"ReportStatus_new");
ALTER TYPE "ReportStatus" RENAME TO "ReportStatus_old";
ALTER TYPE "ReportStatus_new" RENAME TO "ReportStatus";
DROP TYPE "ReportStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "issueType",
ALTER COLUMN "issueDescription" SET NOT NULL;

-- CreateTable
CREATE TABLE "_AttendanceRecordToExperiments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceRecordToExperiments_AB_unique" ON "_AttendanceRecordToExperiments"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceRecordToExperiments_B_index" ON "_AttendanceRecordToExperiments"("B");

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToExperiments" ADD CONSTRAINT "_AttendanceRecordToExperiments_A_fkey" FOREIGN KEY ("A") REFERENCES "AttendanceRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToExperiments" ADD CONSTRAINT "_AttendanceRecordToExperiments_B_fkey" FOREIGN KEY ("B") REFERENCES "Experiments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
