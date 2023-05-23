/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Professors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Professors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coursesId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "coursesId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Professors_email_key" ON "Professors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professors_phoneNumber_key" ON "Professors"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
