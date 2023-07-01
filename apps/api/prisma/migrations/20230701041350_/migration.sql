/*
  Warnings:

  - You are about to drop the column `coursesId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_coursesId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "coursesId",
ADD COLUMN     "coursesCourseCode" TEXT;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_coursesCourseCode_fkey" FOREIGN KEY ("coursesCourseCode") REFERENCES "Courses"("courseCode") ON DELETE SET NULL ON UPDATE CASCADE;
