/*
  Warnings:

  - You are about to drop the column `timeTableId` on the `AttendanceRecord` table. All the data in the column will be lost.
  - You are about to drop the column `labBatch` on the `TimeTable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,labName,periods]` on the table `AttendanceRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "AttendanceRecord_timeTableId_fkey";

-- DropIndex
DROP INDEX "AttendanceRecord_date_labName_key";

-- AlterTable
ALTER TABLE "AttendanceRecord" DROP COLUMN "timeTableId",
ADD COLUMN     "periods" "PeriodNumber"[];

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "labBatch";

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labName_periods_key" ON "AttendanceRecord"("date", "labName", "periods");
