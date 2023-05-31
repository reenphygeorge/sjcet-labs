/*
  Warnings:

  - You are about to drop the column `timeTableId` on the `CourseMapping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseMapping" DROP CONSTRAINT "CourseMapping_timeTableId_fkey";

-- AlterTable
ALTER TABLE "CourseMapping" DROP COLUMN "timeTableId";

-- CreateTable
CREATE TABLE "_CourseMappingToTimeTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseMappingToTimeTable_AB_unique" ON "_CourseMappingToTimeTable"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseMappingToTimeTable_B_index" ON "_CourseMappingToTimeTable"("B");

-- AddForeignKey
ALTER TABLE "_CourseMappingToTimeTable" ADD CONSTRAINT "_CourseMappingToTimeTable_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseMapping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseMappingToTimeTable" ADD CONSTRAINT "_CourseMappingToTimeTable_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
