-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('TEACHER', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "Batch" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "LabBatch" AS ENUM ('BATCH1', 'BATCH2');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "PeriodNumber" AS ENUM ('Period1', 'Period2', 'Period3', 'Period4', 'Period5', 'Period6', 'Period7');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('RESERVATION_APPROVED', 'RESERVATION_REJECTED', 'REPORT');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('THEORY', 'PRACTICAL');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SOLVED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('APPROVED', 'REQUESTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "authId" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "labIncharge" BOOLEAN NOT NULL DEFAULT false,
    "labId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "name" TEXT NOT NULL,
    "batches" INTEGER NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "registerNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentsId" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "batch" "Batch" NOT NULL,
    "labBatch" "LabBatch" NOT NULL,
    "attendanceRecordId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labName" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "venue" TEXT,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "professorId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "day" "Days" NOT NULL,
    "negotiable" BOOLEAN NOT NULL,
    "purpose" TEXT,
    "coursesId" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "period" "PeriodNumber" NOT NULL,
    "teachingDepartmentsId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "batch" "Batch" NOT NULL,
    "status" "ReservationStatus" NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeTable" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "coursesId" TEXT NOT NULL,
    "batch" "Batch" NOT NULL,
    "userId" TEXT NOT NULL,
    "teachingDepartmentId" TEXT NOT NULL,
    "periodNumber" "PeriodNumber" NOT NULL,
    "day" "Days" NOT NULL,
    "labId" TEXT,
    "labBatch" "LabBatch",

    CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "date" DATE NOT NULL,
    "labName" TEXT NOT NULL,
    "timeTableId" TEXT NOT NULL,

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
CREATE TABLE "Experiments" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "experimentNumber" INTEGER NOT NULL,
    "experimentName" TEXT NOT NULL,
    "coursesCourseCode" TEXT NOT NULL,

    CONSTRAINT "Experiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "type" "CourseType" NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseCode")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "professorsProfessorId" TEXT NOT NULL,
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
    "issueType" TEXT NOT NULL,
    "issueDescription" TEXT,
    "status" "ReportStatus" NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Reservation_date_day_labId_period_key" ON "Reservation"("date", "day", "labId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_id_key" ON "TimeTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_userId_teachingDepartmentId_periodNumber_day_key" ON "TimeTable"("userId", "teachingDepartmentId", "periodNumber", "day");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_id_key" ON "AttendanceRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_date_labName_key" ON "AttendanceRecord"("date", "labName");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPositions_id_key" ON "StudentPositions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPositions_studentId_systemNumber_key" ON "StudentPositions"("studentId", "systemNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Experiments_id_key" ON "Experiments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Experiments_experimentNumber_experimentName_key" ON "Experiments"("experimentNumber", "experimentName");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_courseCode_key" ON "Courses"("courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "Notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToDepartments_AB_unique" ON "_CoursesToDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToDepartments_B_index" ON "_CoursesToDepartments"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentsId_fkey" FOREIGN KEY ("departmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_teachingDepartmentsId_fkey" FOREIGN KEY ("teachingDepartmentsId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_teachingDepartmentId_fkey" FOREIGN KEY ("teachingDepartmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_labName_fkey" FOREIGN KEY ("labName") REFERENCES "Lab"("labName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_timeTableId_fkey" FOREIGN KEY ("timeTableId") REFERENCES "TimeTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPositions" ADD CONSTRAINT "StudentPositions_attendanceRecordId_fkey" FOREIGN KEY ("attendanceRecordId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiments" ADD CONSTRAINT "Experiments_coursesCourseCode_fkey" FOREIGN KEY ("coursesCourseCode") REFERENCES "Courses"("courseCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_professorsProfessorId_fkey" FOREIGN KEY ("professorsProfessorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("courseCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
