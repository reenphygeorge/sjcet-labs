/*
  Warnings:

  - You are about to drop the column `genderId` on the `User` table. All the data in the column will be lost.
  - Made the column `venue` on table `Lab` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `batch` to the `LabTimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `LabTimeTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_genderId_fkey";

-- AlterTable
ALTER TABLE "Lab" ALTER COLUMN "venue" SET NOT NULL;

-- AlterTable
ALTER TABLE "LabTimeTable" ADD COLUMN     "batch" TEXT NOT NULL,
ADD COLUMN     "departmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "genderId",
ADD COLUMN     "genderName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_genderName_fkey" FOREIGN KEY ("genderName") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
