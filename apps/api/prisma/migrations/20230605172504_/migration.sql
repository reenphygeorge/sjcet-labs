/*
  Warnings:

  - The `periods` column on the `AttendanceRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `type` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `attendanceRecordId` on the `Student` table. All the data in the column will be lost.
  - The `batch` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `labBatch` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `day` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,labId,period]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teachingDepartmentId,periodNumber]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `semester` on the `Courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `dayId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `semester` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `period` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `batch` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `semester` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `dayId` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `batch` on the `TimeTable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `periodNumber` on the `TimeTable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `genderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_attendanceRecordId_fkey";

-- DropIndex
DROP INDEX "Reservation_date_day_labId_period_key";

-- DropIndex
DROP INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_day_key";

-- AlterTable
ALTER TABLE "AttendanceRecord" DROP COLUMN "periods",
ADD COLUMN     "periods" INTEGER[];

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "type",
ADD COLUMN     "isPractical" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "day",
ADD COLUMN     "dayId" TEXT NOT NULL,
DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER NOT NULL,
DROP COLUMN "period",
ADD COLUMN     "period" INTEGER NOT NULL,
DROP COLUMN "batch",
ADD COLUMN     "batch" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "attendanceRecordId",
DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER NOT NULL,
DROP COLUMN "batch",
ADD COLUMN     "batch" TEXT NOT NULL DEFAULT 'A',
DROP COLUMN "labBatch",
ADD COLUMN     "labBatch" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "day",
ADD COLUMN     "dayId" TEXT NOT NULL,
DROP COLUMN "batch",
ADD COLUMN     "batch" TEXT NOT NULL,
DROP COLUMN "periodNumber",
ADD COLUMN     "periodNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
DROP COLUMN "role",
ADD COLUMN     "genderId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Batch";

-- DropEnum
DROP TYPE "CourseType";

-- DropEnum
DROP TYPE "Days";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "LabBatch";

-- DropEnum
DROP TYPE "PeriodNumber";

-- DropEnum
DROP TYPE "Roles";

-- DropEnum
DROP TYPE "Semester";

-- CreateTable
CREATE TABLE "AbsentStudents" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "studentId" TEXT NOT NULL,
    "attendanceRecordId" TEXT NOT NULL,

    CONSTRAINT "AbsentStudents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Days" (
    "day" TEXT NOT NULL,

    CONSTRAINT "Days_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "Genders" (
    "gender" TEXT NOT NULL,

    CONSTRAINT "Genders_pkey" PRIMARY KEY ("gender")
);

-- CreateIndex
CREATE UNIQUE INDEX "AbsentStudents_id_key" ON "AbsentStudents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Days_day_key" ON "Days"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Genders_gender_key" ON "Genders"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labName_periods_key" ON "AttendanceRecord"("date", "labName", "periods");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_date_labId_period_key" ON "Reservation"("date", "labId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_key" ON "TimeTable"("userId", "teachingDepartmentId", "periodNumber");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("day") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("day") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsentStudents" ADD CONSTRAINT "AbsentStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsentStudents" ADD CONSTRAINT "AbsentStudents_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
