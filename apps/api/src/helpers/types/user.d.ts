import {
  Days,
  Experiments,
  Genders,
  LabTimeTable,
  Report,
  Reservation,
  ReservationStatus,
  TimeTable,
} from '@prisma/client';

export interface PatchUserData {
  id: string;
  registerNumber: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
}

export interface StudentInfo {
  departmentId: string;
  semester: number;
  batch: string;
  labBatch: number?;
}

export interface AttendanceInfo {
  date: Date;
  labId: string;
  periods: number[];
  courseCode: string;
  experimentIds: string[];
  teachingStaff: string[];
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
  labId: string;
  periods: number[];
}

export interface ReportData {
  labId: string;
  professorId: string;
  systems: number[];
  issueDescription: string;
}

export interface FreeLabRequestInfo {
  day: string;
  periodNumbers: number[];
}

export interface FreeLabResponseInfo {
  id: string;
  labName: string;
  status: LabStatus;
  reservation: Reservation | null;
}

export interface UserReservation {
  id: string;
  staffName: string;
  semester: number;
  department: Department;
  dateOfRequest: string;
  periods: number[];
  status: string;
  purpose: string | null;
}

export interface UserReport {
  id: string;
  staffName: string;
  date: string;
  timing: string;
  status: string;
  issue: string;
  systemNo: number[];
}

export interface UserDepartment {
  id: string;
  name: string;
  batch: string | null;
}

export interface UserLabData {
  id: string;
  labName: string;
  capacity: number;
  report: ReportNew[];
  reservation: ReservationNew[];
  timeTable: LabTimeTable[];
}
