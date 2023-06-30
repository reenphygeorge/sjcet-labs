/*
  Warnings:

  - A unique constraint covering the columns `[dayNumber]` on the table `Days` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayNumber` to the `Days` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LabTimeTable" DROP CONSTRAINT "LabTimeTable_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_teachingDepartmentId_fkey";

-- AlterTable
ALTER TABLE "Days" ADD COLUMN     "dayNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LabTimeTable" ALTER COLUMN "semester" DROP NOT NULL,
ALTER COLUMN "batch" DROP NOT NULL,
ALTER COLUMN "departmentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" ALTER COLUMN "teachingDepartmentId" DROP NOT NULL,
ALTER COLUMN "batch" DROP NOT NULL,
ALTER COLUMN "semester" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Days_dayNumber_key" ON "Days"("dayNumber");

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_teachingDepartmentId_fkey" FOREIGN KEY ("teachingDepartmentId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
