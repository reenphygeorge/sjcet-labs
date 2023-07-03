/*
  Warnings:

  - A unique constraint covering the columns `[experimentNumber,experimentName,courseCode]` on the table `Experiments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Experiments_experimentNumber_experimentName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Experiments_experimentNumber_experimentName_courseCode_key" ON "Experiments"("experimentNumber", "experimentName", "courseCode");
