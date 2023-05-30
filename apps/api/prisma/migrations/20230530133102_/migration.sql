/*
  Warnings:

  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseCode]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CourseMapping" DROP CONSTRAINT "CourseMapping_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToDepartments" DROP CONSTRAINT "_CoursesToDepartments_A_fkey";

-- DropIndex
DROP INDEX "Courses_id_key";

-- AlterTable
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_courseCode_key" ON "Courses"("courseCode");

-- AddForeignKey
ALTER TABLE "CourseMapping" ADD CONSTRAINT "CourseMapping_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("courseCode") ON DELETE CASCADE ON UPDATE CASCADE;
