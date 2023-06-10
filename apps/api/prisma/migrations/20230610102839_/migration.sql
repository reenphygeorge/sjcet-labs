-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_labId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labName") ON DELETE RESTRICT ON UPDATE CASCADE;
