/*
  Warnings:

  - Added the required column `genderName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "genderName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_genderName_fkey" FOREIGN KEY ("genderName") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;
