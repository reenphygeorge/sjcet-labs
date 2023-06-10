-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_labId_fkey";

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labName") ON DELETE SET NULL ON UPDATE CASCADE;
