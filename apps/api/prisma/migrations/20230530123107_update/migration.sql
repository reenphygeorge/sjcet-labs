/*
  Warnings:

  - You are about to drop the column `course1Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `course2Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `course3Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `course4Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `course5Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `course6Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `course7Id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `departmentsId` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `TimeTable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[batch,dayOfTheWeek]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course1Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course2Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course3Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course4Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course5Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course6Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_course7Id_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_departmentsId_fkey";

-- DropIndex
DROP INDEX "TimeTable_departmentsId_semester_batch_dayOfTheWeek_key";

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "course1Id",
DROP COLUMN "course2Id",
DROP COLUMN "course3Id",
DROP COLUMN "course4Id",
DROP COLUMN "course5Id",
DROP COLUMN "course6Id",
DROP COLUMN "course7Id",
DROP COLUMN "departmentsId",
DROP COLUMN "semester",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CoursesToTimeTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToTimeTable_AB_unique" ON "_CoursesToTimeTable"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToTimeTable_B_index" ON "_CoursesToTimeTable"("B");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_batch_dayOfTheWeek_key" ON "TimeTable"("batch", "dayOfTheWeek");

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToTimeTable" ADD CONSTRAINT "_CoursesToTimeTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToTimeTable" ADD CONSTRAINT "_CoursesToTimeTable_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
