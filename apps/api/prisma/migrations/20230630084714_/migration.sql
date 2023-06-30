/*
  Warnings:

  - You are about to drop the column `professorsProfessorId` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `professorId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_professorsProfessorId_fkey";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "professorsProfessorId",
ADD COLUMN     "professorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
