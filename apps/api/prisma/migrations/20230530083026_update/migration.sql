/*
  Warnings:

  - You are about to drop the column `coursesId` on the `Periods` table. All the data in the column will be lost.
  - The primary key for the `TimeTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `periodsId` column on the `TimeTable` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[departmentsId,semester,batch]` on the table `Periods` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch` to the `Periods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfTheWeek` to the `Periods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batch` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropForeignKey
ALTER TABLE "Periods" DROP CONSTRAINT "Periods_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_periodsId_fkey";

-- DropIndex
DROP INDEX "TimeTable_departmentsId_key";

-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "coursesId",
ADD COLUMN     "batch" "Batch" NOT NULL,
ADD COLUMN     "courseName" TEXT[],
ADD COLUMN     "dayOfTheWeek" "Days" NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_pkey",
ADD COLUMN     "batch" "Batch" NOT NULL,
ADD COLUMN     "semester" "Semester" NOT NULL,
DROP COLUMN "periodsId",
ADD COLUMN     "periodsId" TEXT[],
ADD CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("departmentsId", "semester", "batch");

-- CreateTable
CREATE TABLE "_CoursesToPeriods" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToPeriods_AB_unique" ON "_CoursesToPeriods"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToPeriods_B_index" ON "_CoursesToPeriods"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Periods_departmentsId_semester_batch_key" ON "Periods"("departmentsId", "semester", "batch");

-- AddForeignKey
ALTER TABLE "Periods" ADD CONSTRAINT "Periods_departmentsId_semester_batch_fkey" FOREIGN KEY ("departmentsId", "semester", "batch") REFERENCES "TimeTable"("departmentsId", "semester", "batch") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToPeriods" ADD CONSTRAINT "_CoursesToPeriods_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToPeriods" ADD CONSTRAINT "_CoursesToPeriods_B_fkey" FOREIGN KEY ("B") REFERENCES "Periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;
