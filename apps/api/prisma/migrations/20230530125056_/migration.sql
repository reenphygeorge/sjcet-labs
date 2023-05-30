/*
  Warnings:

  - The primary key for the `TimeTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `batch` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the `_CoursesToTimeTable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dayOfTheWeek]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `semester` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batch` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CoursesToTimeTable" DROP CONSTRAINT "_CoursesToTimeTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToTimeTable" DROP CONSTRAINT "_CoursesToTimeTable_B_fkey";

-- DropIndex
DROP INDEX "TimeTable_batch_dayOfTheWeek_key";

-- DropIndex
DROP INDEX "TimeTable_id_key";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "semester" "Semester" NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "batch",
ADD COLUMN     "batch" "Batch" NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_pkey",
DROP COLUMN "batch",
DROP COLUMN "id",
ADD CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("userId", "dayOfTheWeek");

-- DropTable
DROP TABLE "_CoursesToTimeTable";

-- CreateTable
CREATE TABLE "CourseToBatch" (
    "coursesId" TEXT NOT NULL,
    "batch" "Batch" NOT NULL,
    "timeTableUserId" TEXT NOT NULL,
    "dayOfTheWeek" "Days" NOT NULL,

    CONSTRAINT "CourseToBatch_pkey" PRIMARY KEY ("coursesId","batch")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_dayOfTheWeek_key" ON "TimeTable"("dayOfTheWeek");

-- AddForeignKey
ALTER TABLE "CourseToBatch" ADD CONSTRAINT "CourseToBatch_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseToBatch" ADD CONSTRAINT "CourseToBatch_timeTableUserId_dayOfTheWeek_fkey" FOREIGN KEY ("timeTableUserId", "dayOfTheWeek") REFERENCES "TimeTable"("userId", "dayOfTheWeek") ON DELETE RESTRICT ON UPDATE CASCADE;
