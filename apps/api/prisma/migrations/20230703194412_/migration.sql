-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('RESERVATION_APPROVED', 'RESERVATION_REJECTED', 'RESERVATION_REQUEST', 'REPORT');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'SOLVED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('APPROVED', 'REQUESTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "authId" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "labAdmin" BOOLEAN NOT NULL DEFAULT false,
    "labIncharge" BOOLEAN NOT NULL DEFAULT false,
    "labId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "registerNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "departmentsId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "batch" TEXT NOT NULL DEFAULT 'A',
    "labBatch" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labName" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "professorId" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayId" TEXT NOT NULL,
    "negotiable" BOOLEAN NOT NULL,
    "purpose" TEXT,
    "semester" INTEGER NOT NULL,
    "periods" INTEGER[],
    "teachingDepartmentsId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "batch" TEXT,
    "status" "ReservationStatus" NOT NULL DEFAULT 'REQUESTED',
    "coursesCourseCode" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeTable" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "userId" TEXT NOT NULL,
    "coursesId" TEXT,
    "semester" INTEGER,
    "batch" TEXT,
    "periodNumber" INTEGER NOT NULL,
    "dayId" TEXT NOT NULL,
    "teachingDepartmentId" TEXT,
    "labId" TEXT,

    CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTimeTable" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labId" TEXT NOT NULL,
    "courseCode" TEXT,
    "departmentId" TEXT,
    "semester" INTEGER,
    "batch" TEXT,
    "periodNumber" INTEGER NOT NULL,
    "dayId" TEXT NOT NULL,

    CONSTRAINT "LabTimeTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "labId" TEXT NOT NULL,
    "periods" INTEGER[],
    "courseCode" TEXT NOT NULL,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPositions" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "studentId" TEXT NOT NULL,
    "systemNumber" INTEGER NOT NULL,
    "attendanceRecordId" TEXT NOT NULL,

    CONSTRAINT "StudentPositions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbsentStudents" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "studentId" TEXT NOT NULL,
    "attendanceRecordId" TEXT NOT NULL,

    CONSTRAINT "AbsentStudents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiments" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "experimentNumber" INTEGER NOT NULL,
    "experimentName" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,

    CONSTRAINT "Experiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "isPractical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseCode")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "professorId" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "message" TEXT,
    "type" "NotificationType" NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "systems" INTEGER[],
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issueDescription" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Days" (
    "day" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,

    CONSTRAINT "Days_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "Genders" (
    "gender" TEXT NOT NULL,

    CONSTRAINT "Genders_pkey" PRIMARY KEY ("gender")
);

-- CreateTable
CREATE TABLE "_LabTimeTableToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttendanceRecordToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttendanceRecordToExperiments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CoursesToDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_registerNumber_key" ON "User"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_id_key" ON "Departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_key" ON "Departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_registerNumber_key" ON "Student"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_id_key" ON "Lab"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_labName_key" ON "Lab"("labName");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_dayId_labId_periods_semester_batch_teachingDepa_key" ON "Reservation"("dayId", "labId", "periods", "semester", "batch", "teachingDepartmentsId", "professorId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_id_key" ON "TimeTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_teachingDepartmentId_periodNumber_batch_semester__key" ON "TimeTable"("teachingDepartmentId", "periodNumber", "batch", "semester", "dayId");

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_id_key" ON "LabTimeTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LabTimeTable_departmentId_semester_batch_periodNumber_dayId_key" ON "LabTimeTable"("departmentId", "semester", "batch", "periodNumber", "dayId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_id_key" ON "AttendanceRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labId_periods_key" ON "AttendanceRecord"("date", "labId", "periods");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPositions_id_key" ON "StudentPositions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPositions_studentId_systemNumber_key" ON "StudentPositions"("studentId", "systemNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AbsentStudents_id_key" ON "AbsentStudents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Experiments_id_key" ON "Experiments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Experiments_experimentNumber_experimentName_courseCode_key" ON "Experiments"("experimentNumber", "experimentName", "courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_courseCode_key" ON "Courses"("courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "Notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Days_day_key" ON "Days"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Days_dayNumber_key" ON "Days"("dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Genders_gender_key" ON "Genders"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "_LabTimeTableToUser_AB_unique" ON "_LabTimeTableToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LabTimeTableToUser_B_index" ON "_LabTimeTableToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceRecordToUser_AB_unique" ON "_AttendanceRecordToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceRecordToUser_B_index" ON "_AttendanceRecordToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceRecordToExperiments_AB_unique" ON "_AttendanceRecordToExperiments"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceRecordToExperiments_B_index" ON "_AttendanceRecordToExperiments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToDepartments_AB_unique" ON "_CoursesToDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToDepartments_B_index" ON "_CoursesToDepartments"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Genders"("gender") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("day") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_teachingDepartmentsId_fkey" FOREIGN KEY ("teachingDepartmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_coursesCourseCode_fkey" FOREIGN KEY ("coursesCourseCode") REFERENCES "Courses"("courseCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("day") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_teachingDepartmentId_fkey" FOREIGN KEY ("teachingDepartmentId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTimeTable" ADD CONSTRAINT "LabTimeTable_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Days"("day") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsentStudents" ADD CONSTRAINT "AbsentStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbsentStudents" ADD CONSTRAINT "AbsentStudents_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiments" ADD CONSTRAINT "Experiments_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("registerNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabTimeTableToUser" ADD CONSTRAINT "_LabTimeTableToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LabTimeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabTimeTableToUser" ADD CONSTRAINT "_LabTimeTableToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToUser" ADD CONSTRAINT "_AttendanceRecordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "AttendanceRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToUser" ADD CONSTRAINT "_AttendanceRecordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToExperiments" ADD CONSTRAINT "_AttendanceRecordToExperiments_A_fkey" FOREIGN KEY ("A") REFERENCES "AttendanceRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceRecordToExperiments" ADD CONSTRAINT "_AttendanceRecordToExperiments_B_fkey" FOREIGN KEY ("B") REFERENCES "Experiments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("courseCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
