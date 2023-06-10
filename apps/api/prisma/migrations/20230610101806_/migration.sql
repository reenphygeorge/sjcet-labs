-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_labId_fkey";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("labName") ON DELETE RESTRICT ON UPDATE CASCADE;
