-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Teacher', 'Administrator', 'Lab_Incharge', 'HOD');

-- CreateTable
CREATE TABLE "Professors" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "authId" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "deptId" INTEGER NOT NULL,
    "departmentId" TEXT NOT NULL,
    "role" "Roles" NOT NULL,

    CONSTRAINT "Professors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "deptName" TEXT NOT NULL,
    "deptLocation" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Labs" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labName" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "roomNumber" TEXT NOT NULL,

    CONSTRAINT "Labs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "professorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "negotiable" BOOLEAN NOT NULL,
    "note" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usage_Statistics" (
    "id" TEXT NOT NULL,
    "reservationCount" INTEGER NOT NULL,
    "averageUsageTime" INTEGER,
    "peakUsagePeriod" INTEGER,

    CONSTRAINT "Usage_Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "professorsProfessorId" TEXT NOT NULL,
    "message" TEXT,
    "timeStamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "labsLabId" TEXT NOT NULL,
    "professorsProfessorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "issue_type" TEXT NOT NULL,
    "issue_description" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoursesToDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Professors_id_key" ON "Professors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professors_authId_key" ON "Professors"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "Professors_departmentId_key" ON "Professors"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_id_key" ON "Departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Labs_id_key" ON "Labs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_id_key" ON "Courses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "Notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Maintenance_id_key" ON "Maintenance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToDepartments_AB_unique" ON "_CoursesToDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToDepartments_B_index" ON "_CoursesToDepartments"("B");

-- AddForeignKey
ALTER TABLE "Professors" ADD CONSTRAINT "Professors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usage_Statistics" ADD CONSTRAINT "Usage_Statistics_id_fkey" FOREIGN KEY ("id") REFERENCES "Labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_professorsProfessorId_fkey" FOREIGN KEY ("professorsProfessorId") REFERENCES "Professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_labsLabId_fkey" FOREIGN KEY ("labsLabId") REFERENCES "Labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_professorsProfessorId_fkey" FOREIGN KEY ("professorsProfessorId") REFERENCES "Professors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToDepartments" ADD CONSTRAINT "_CoursesToDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
