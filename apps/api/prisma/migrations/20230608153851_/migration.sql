/*
  Warnings:

  - You are about to drop the column `coursesCourseCode` on the `Experiments` table. All the data in the column will be lost.
  - Added the required column `courseCode` to the `Experiments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Experiments" DROP CONSTRAINT "Experiments_coursesCourseCode_fkey";

-- AlterTable
ALTER TABLE "Experiments" DROP COLUMN "coursesCourseCode",
ADD COLUMN     "courseCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Experiments" ADD CONSTRAINT "Experiments_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;
