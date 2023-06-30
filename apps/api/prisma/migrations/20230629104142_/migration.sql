/*
  Warnings:

  - You are about to drop the column `userId` on the `LabTimeTable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentId,semester,batch,periodNumber,dayId,labName]` on the table `LabTimeTable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LabTimeTable" DROP CONSTRAINT "LabTimeTable_userId_fkey";

-- DropIndex
DROP INDEX "LabTimeTable_userId_departmentId_semester_batch_periodNumbe_key";

-- AlterTable
ALTER TABLE "LabTimeTable" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_admin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_departmentId_semester_batch_periodNumber_dayId_key" ON "LabTimeTable"("departmentId", "semester", "batch", "periodNumber", "dayId", "labName");

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "LabTimeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
