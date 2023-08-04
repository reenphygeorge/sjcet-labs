/*
  Warnings:

  - You are about to drop the `_AttendanceRecordToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AttendanceRecordToUser" DROP CONSTRAINT "_AttendanceRecordToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendanceRecordToUser" DROP CONSTRAINT "_AttendanceRecordToUser_B_fkey";

-- DropTable
DROP TABLE "_AttendanceRecordToUser";
