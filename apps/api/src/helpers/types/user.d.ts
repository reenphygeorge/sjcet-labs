import { Days, Experiments, Genders, LabTimeTable, Report, Reservation, ReservationStatus, TimeTable } from "@prisma/client";

export interface PatchUserData {
	authId: string;
	registerNumber: string;
	name: string;
	departmentId: string;
	email: string;
	phoneNumber: string;
}

export interface StudentInfo {
	departmentId: string;
	semester: number;
	batch: string;
	labBatch: number?;
}

export interface AttendanceInfo {
	date: Date;
	labName: string;
	periods: number[];
	courseCode: string;
	experimentIds: string[];
}

export interface StudentPositions {
	studentId: string;
	systemNumber: number;
	attendanceRecordId: string;
}

export interface AbsentStudents {
	studentId: string;
	attendanceRecordId: string;
}

export interface ReservationInfo {
	professorId: string;
	dayId: string;
	negotiable: boolean;
	purpose: string?;
	coursesId: string;
	semester: number;
	batch: string;
	periods: number[];
	teachingDepartmentsId: string;
	labId: string;
	status: ReservationStatus | undefined;
}

export interface ReviewInfo {
	reservationId: string;
	status: ReservationStatus;
}

export interface LogData {
	date: Date;
	labName: string;
	periods: number[];
}

export interface ReportData {
	labId: string;
	professorId: string;
	systems: number[];
	issueDescription: string;
}

export interface FreeLabInfo {
	day: string;
	periods: number[];
}