import { Genders, LabTimeTable, Report, Reservation, TimeTable } from "@prisma/client";

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