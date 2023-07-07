/*
  Warnings:

  - You are about to drop the column `coursesCourseCode` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_coursesCourseCode_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "coursesCourseCode";
