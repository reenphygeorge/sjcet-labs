/*
  Warnings:

  - You are about to drop the column `semester` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `batches` on the `Departments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registerNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseCode` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfBatches` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_professorsProfessorId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_professorId_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_userId_fkey";

-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "courseCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "semester";

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "batches",
ADD COLUMN     "numberOfBatches" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" ADD COLUMN     "semester" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LabTimeTable" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "userId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "periodNumber" INTEGER NOT NULL,
    "dayId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "LabTimeTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LabTimeTableToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_id_key" ON "LabTimeTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_LabTimeTableToUser_AB_unique" ON "_LabTimeTableToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LabTimeTableToUser_B_index" ON "_LabTimeTableToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_registerNumber_key" ON "User"("registerNumber");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("day") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_professorsProfessorId_fkey" FOREIGN KEY ("professorsProfessorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabTimeTableToUser" ADD CONSTRAINT "_LabTimeTableToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LabTimeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabTimeTableToUser" ADD CONSTRAINT "_LabTimeTableToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
