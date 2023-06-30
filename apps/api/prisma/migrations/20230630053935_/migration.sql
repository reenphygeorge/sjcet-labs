-- CreateTable
CREATE TABLE "_AttendanceRecordToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceRecordToUser_AB_unique" ON "_AttendanceRecordToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceRecordToUser_B_index" ON "_AttendanceRecordToUser"("B");

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToUser" ADD CONSTRAINT "_AttendanceRecordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "AttendanceRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToUser" ADD CONSTRAINT "_AttendanceRecordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
