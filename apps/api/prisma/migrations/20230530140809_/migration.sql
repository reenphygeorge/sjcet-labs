/*
  Warnings:

  - Added the required column `periodNumber` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTable" ADD COLUMN     "periodNumber" "PeriodNumber" NOT NULL;
