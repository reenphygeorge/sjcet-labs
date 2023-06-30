/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `Lab` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "roomNumber",
DROP COLUMN "venue";
