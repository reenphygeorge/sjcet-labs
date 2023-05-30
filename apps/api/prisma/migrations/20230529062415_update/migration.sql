/*
  Warnings:

  - The values [Teacher,Administrator,Lab_Incharge] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('TEACHER', 'ADMINISTRATOR', 'LAB_INCHARGE', 'HOD');
ALTER TABLE "Professors" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
COMMIT;
