/*
  Warnings:

  - A unique constraint covering the columns `[name,batch]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_teachingDepartmentsId_fkey";

-- DropIndex
DROP INDEX "Departments_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_batch_key" ON "Departments"("name", "batch");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_teachingDepartmentsId_fkey" FOREIGN KEY ("teachingDepartmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
