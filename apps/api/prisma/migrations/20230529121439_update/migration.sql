-- DropForeignKey
ALTER TABLE "Professors" DROP CONSTRAINT "Professors_departmentId_fkey";

-- AlterTable
ALTER TABLE "Professors" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT,
ALTER COLUMN "departmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Professors" ADD CONSTRAINT "Professors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
