/*
  Warnings:

  - A unique constraint covering the columns `[deptHeadId]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deptHeadId` to the `Departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "deptHeadId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Departments_deptHeadId_key" ON "Departments"("deptHeadId");

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_deptHeadId_fkey" FOREIGN KEY ("deptHeadId") REFERENCES "Professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
