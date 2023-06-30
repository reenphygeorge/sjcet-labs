/*
  Warnings:

  - You are about to drop the column `numberOfBatches` on the `Departments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,departmentId,semester,batch,periodNumber,dayId,labName]` on the table `LabTimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labName` to the `LabTimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LabTimeTable_userId_departmentId_semester_batch_periodNumbe_key";

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "numberOfBatches",
ADD COLUMN     "batch" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LabTimeTable" ADD COLUMN     "labName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_userId_departmentId_semester_batch_periodNumbe_key" ON "LabTimeTable"("userId", "departmentId", "semester", "batch", "periodNumber", "dayId", "labName");

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_labName_fkey" FOREIGN KEY ("labName") REFERENCES "Lab"("labName") ON DELETE RESTRICT ON UPDATE CASCADE;
