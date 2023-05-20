/*
  Warnings:

  - You are about to drop the `Usage_Statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usage_Statistics" DROP CONSTRAINT "Usage_Statistics_id_fkey";

-- DropTable
DROP TABLE "Usage_Statistics";

-- CreateTable
CREATE TABLE "UsageStatistics" (
    "id" TEXT NOT NULL,
    "reservationCount" INTEGER NOT NULL,
    "averageUsageTime" INTEGER,
    "peakUsagePeriod" INTEGER,

    CONSTRAINT "UsageStatistics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsageStatistics" ADD CONSTRAINT "UsageStatistics_id_fkey" FOREIGN KEY ("id") REFERENCES "Labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
