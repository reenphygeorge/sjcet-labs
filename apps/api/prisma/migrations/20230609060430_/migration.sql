-- DropForeignKey
ALTER TABLE "LabTimeTable" DROP CONSTRAINT "LabTimeTable_courseCode_fkey";

-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_coursesId_fkey";

-- AlterTable
ALTER TABLE "LabTimeTable" ALTER COLUMN "courseCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" ALTER COLUMN "coursesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE SET NULL ON UPDATE CASCADE;
