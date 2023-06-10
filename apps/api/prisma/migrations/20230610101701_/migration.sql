-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_teachingDepartmentsId_fkey";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_teachingDepartmentsId_fkey" FOREIGN KEY ("teachingDepartmentsId") REFERENCES "Departments"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
