/*
  Warnings:

  - The values [Batch1,Batch2] on the enum `LabBatch` will be removed. If these variants are still used in the database, this will fail.
  - The values [LAB_INCHARGE,HOD] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `labsLabId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `professorsProfessorId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `Labs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `labId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LabBatch_new" AS ENUM ('BATCH1', 'BATCH2');
ALTER TABLE "Student" ALTER COLUMN "labBatch" TYPE "LabBatch_new" USING ("labBatch"::text::"LabBatch_new");
ALTER TYPE "LabBatch" RENAME TO "LabBatch_old";
ALTER TYPE "LabBatch_new" RENAME TO "LabBatch";
DROP TYPE "LabBatch_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('TEACHER', 'ADMINISTRATOR');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_labsLabId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_professorsProfessorId_fkey";

-- DropIndex
DROP INDEX "TimeTable_coursesId_batch_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "labsLabId",
DROP COLUMN "professorsProfessorId",
ADD COLUMN     "labId" TEXT NOT NULL,
ADD COLUMN     "professorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeTable" ADD COLUMN     "labId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "labId" TEXT,
ADD COLUMN     "labIncharge" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Labs";

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labName" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "venue" TEXT,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lab_id_key" ON "Lab"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
