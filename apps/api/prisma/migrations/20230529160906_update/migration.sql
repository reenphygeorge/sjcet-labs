/*
  Warnings:

  - You are about to drop the column `deptLocation` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `deptName` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `coursesId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Maintenance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsageStatistics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `batches` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentsId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Batch" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "LabBatch" AS ENUM ('Batch1', 'Batch2');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8');

-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_labsLabId_fkey";

-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_professorsProfessorId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_professorsProfessorId_fkey";

-- DropForeignKey
ALTER TABLE "Professors" DROP CONSTRAINT "Professors_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_professorId_fkey";

-- DropForeignKey
ALTER TABLE "UsageStatistics" DROP CONSTRAINT "UsageStatistics_id_fkey";

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "deptLocation",
DROP COLUMN "deptName",
ADD COLUMN     "batches" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "coursesId",
DROP COLUMN "note",
ADD COLUMN     "batch" TEXT,
ADD COLUMN     "departmentsId" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "semester" "Semester" NOT NULL;

-- DropTable
DROP TABLE "Maintenance";

-- DropTable
DROP TABLE "Notifications";

-- DropTable
DROP TABLE "Professors";

-- DropTable
DROP TABLE "UsageStatistics";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "authId" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "role" "Roles" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "registerNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentsId" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "batch" "Batch" NOT NULL,
    "labBatch" "LabBatch" NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periods" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "departmentsId" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "coursesId" TEXT NOT NULL,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeTable" (
    "departmentsId" TEXT NOT NULL,
    "periodsId" TEXT NOT NULL,

    CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("departmentsId")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labsLabId" TEXT NOT NULL,
    "professorsProfessorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "issue_type" TEXT NOT NULL,
    "issue_description" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_registerNumber_key" ON "Student"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Periods_id_key" ON "Periods"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_departmentsId_key" ON "TimeTable"("departmentsId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periods" ADD CONSTRAINT "Periods_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periods" ADD CONSTRAINT "Periods_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_periodsId_fkey" FOREIGN KEY ("periodsId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labsLabId_fkey" FOREIGN KEY ("labsLabId") REFERENCES "Labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_professorsProfessorId_fkey" FOREIGN KEY ("professorsProfessorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
