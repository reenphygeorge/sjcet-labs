/*
  Warnings:

  - You are about to drop the column `dayOfTheWeek` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the `CourseMapping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseMappingToTimeTable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[coursesId,batch]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursesId` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teachingDepartmentId` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseMapping" DROP CONSTRAINT "CourseMapping_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "CourseMapping" DROP CONSTRAINT "CourseMapping_teachingDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseMappingToTimeTable" DROP CONSTRAINT "_CourseMappingToTimeTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseMappingToTimeTable" DROP CONSTRAINT "_CourseMappingToTimeTable_B_fkey";

-- DropIndex
DROP INDEX "TimeTable_dayOfTheWeek_key";

-- DropIndex
DROP INDEX "TimeTable_userId_dayOfTheWeek_key";

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "dayOfTheWeek",
ADD COLUMN     "batch" "Batch" NOT NULL,
ADD COLUMN     "coursesId" TEXT NOT NULL,
ADD COLUMN     "day" "Days" NOT NULL,
ADD COLUMN     "teachingDepartmentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CourseMapping";

-- DropTable
DROP TABLE "_CourseMappingToTimeTable";

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_coursesId_batch_key" ON "TimeTable"("coursesId", "batch");

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_teachingDepartmentId_fkey" FOREIGN KEY ("teachingDepartmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
