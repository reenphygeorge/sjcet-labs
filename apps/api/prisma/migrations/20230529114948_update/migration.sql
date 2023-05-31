/*
  Warnings:

  - You are about to drop the column `deptHeadId` on the `Departments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Departments" DROP CONSTRAINT "Departments_deptHeadId_fkey";

-- DropIndex
DROP INDEX "Departments_deptHeadId_key";

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "deptHeadId";
