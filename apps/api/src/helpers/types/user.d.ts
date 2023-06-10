import { Experiments, Genders, LabTimeTable, Report, Reservation, ReservationStatus, TimeTable } from "@prisma/client";

export interface PatchUserData {
	authId: string;
	registerNumber: string;
	name: string;
	departmentId: string;
	email: string;
	phoneNumber: string;
}

// export interface GetUserData {
// 	id: string;
// 	authId: string;
// 	registerNumber: string;
// 	name: string;
// 	gender: Genders;
// 	email: string;
// 	phoneNumber: string;
// 	departmentId: string;
// 	reservations: Reservation[]?;
// 	notifications: Notification[]?;
// 	reports: Report[]?;
// 	labAdmin: boolean;
// 	labIncharge: boolean;
// 	timeTable: TimeTable[]?;
// 	labId: string;
// 	labTimeTable: LabTimeTable[]?;
// 	teachingAtLab: LabTimeTable[]?
// }

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
	date: Date;
	dayId: string;
	negotiable: boolean;
	purpose: string?;
	coursesId: string;
	semester: number;
	batch: string;
	period: number;
	teachingDepartmentsId: string;
	labId: string;
	status: ReservationStatus | undefined;
}