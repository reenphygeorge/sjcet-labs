/*
  Warnings:

  - The primary key for the `CourseMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `CourseMapping` table. All the data in the column will be lost.
  - The primary key for the `TimeTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `CourseMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coursesId,batch]` on the table `CourseMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,dayOfTheWeek]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeTableId` to the `CourseMapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseMapping" DROP CONSTRAINT "CourseMapping_userId_dayOfTheWeek_fkey";

-- AlterTable
ALTER TABLE "CourseMapping" DROP CONSTRAINT "CourseMapping_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
ADD COLUMN     "timeTableId" TEXT NOT NULL,
ADD CONSTRAINT "CourseMapping_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_pkey",
ADD COLUMN     "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
ADD CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseMapping_id_key" ON "CourseMapping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseMapping_coursesId_batch_key" ON "CourseMapping"("coursesId", "batch");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_id_key" ON "TimeTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_userId_dayOfTheWeek_key" ON "TimeTable"("userId", "dayOfTheWeek");

-- AddForeignKey
ALTER TABLE "CourseMapping" ADD CONSTRAINT "CourseMapping_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "TimeTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
