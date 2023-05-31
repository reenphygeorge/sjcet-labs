/*
  Warnings:

  - You are about to drop the column `labId` on the `AttendanceRecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,labName,periods]` on the table `AttendanceRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labName]` on the table `Lab` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labName` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttendanceRecord" DROP CONSTRAINT "AttendanceRecord_labId_fkey";

-- DropIndex
DROP INDEX "AttendanceRecord_date_labId_periods_key";

-- AlterTable
ALTER TABLE "AttendanceRecord" DROP COLUMN "labId",
ADD COLUMN     "labName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labName_periods_key" ON "AttendanceRecord"("date", "labName", "periods");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_labName_key" ON "Lab"("labName");

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_labName_fkey" FOREIGN KEY ("labName") REFERENCES "Lab"("labName") ON DELETE RESTRICT ON UPDATE CASCADE;
