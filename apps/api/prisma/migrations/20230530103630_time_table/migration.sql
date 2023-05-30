/*
  Warnings:

  - The primary key for the `TimeTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `periodsId` on the `TimeTable` table. All the data in the column will be lost.
  - You are about to drop the `Periods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoursesToPeriods` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentsId,semester,batch,dayOfTheWeek]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course1Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course2Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course3Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course4Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course5Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course6Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course7Id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfTheWeek` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Periods" DROP CONSTRAINT "Periods_departmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Periods" DROP CONSTRAINT "Periods_departmentsId_semester_batch_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToPeriods" DROP CONSTRAINT "_CoursesToPeriods_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesToPeriods" DROP CONSTRAINT "_CoursesToPeriods_B_fkey";

-- AlterTable
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_pkey",
DROP COLUMN "periodsId",
ADD COLUMN     "course1Id" TEXT NOT NULL,
ADD COLUMN     "course2Id" TEXT NOT NULL,
ADD COLUMN     "course3Id" TEXT NOT NULL,
ADD COLUMN     "course4Id" TEXT NOT NULL,
ADD COLUMN     "course5Id" TEXT NOT NULL,
ADD COLUMN     "course6Id" TEXT NOT NULL,
ADD COLUMN     "course7Id" TEXT NOT NULL,
ADD COLUMN     "dayOfTheWeek" "Days" NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
ADD CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Periods";

-- DropTable
DROP TABLE "_CoursesToPeriods";

-- CreateTable
CREATE TABLE "_CoursesToDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToDepartments_AB_unique" ON "_CoursesToDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToDepartments_B_index" ON "_CoursesToDepartments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_id_key" ON "TimeTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_departmentsId_semester_batch_dayOfTheWeek_key" ON "TimeTable"("departmentsId", "semester", "batch", "dayOfTheWeek");

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course1Id_fkey" FOREIGN KEY ("course1Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course2Id_fkey" FOREIGN KEY ("course2Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course3Id_fkey" FOREIGN KEY ("course3Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course4Id_fkey" FOREIGN KEY ("course4Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course5Id_fkey" FOREIGN KEY ("course5Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course6Id_fkey" FOREIGN KEY ("course6Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_course7Id_fkey" FOREIGN KEY ("course7Id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
