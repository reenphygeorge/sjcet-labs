/*
  Warnings:

  - You are about to drop the `CourseToBatch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseToBatch" DROP CONSTRAINT "CourseToBatch_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "CourseToBatch" DROP CONSTRAINT "CourseToBatch_timeTableUserId_dayOfTheWeek_fkey";

-- DropTable
DROP TABLE "CourseToBatch";

-- CreateTable
CREATE TABLE "CourseMapping" (
    "coursesId" TEXT NOT NULL,
    "batch" "Batch" NOT NULL,
    "userId" TEXT NOT NULL,
    "teachingDepartmentId" TEXT NOT NULL,
    "dayOfTheWeek" "Days" NOT NULL,

    CONSTRAINT "CourseMapping_pkey" PRIMARY KEY ("coursesId","batch")
);

-- AddForeignKey
ALTER TABLE "CourseMapping" ADD CONSTRAINT "CourseMapping_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMapping" ADD CONSTRAINT "CourseMapping_userId_dayOfTheWeek_fkey" FOREIGN KEY ("userId", "dayOfTheWeek") REFERENCES "TimeTable"("userId", "dayOfTheWeek") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMapping" ADD CONSTRAINT "CourseMapping_teachingDepartmentId_fkey" FOREIGN KEY ("teachingDepartmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
