/*
  Warnings:

  - You are about to drop the column `genderName` on the `User` table. All the data in the column will be lost.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_genderName_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "genderName",
ADD COLUMN     "gender" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;
