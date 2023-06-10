-- DropForeignKey
ALTER TABLE "AbsentStudents" DROP CONSTRAINT "AbsentStudents_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPositions" DROP CONSTRAINT "StudentPositions_studentId_fkey";

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsentStudents" ADD CONSTRAINT "AbsentStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
