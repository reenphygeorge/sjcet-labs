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

// export interface UserReservation {
// 	id: string;
// 	staffName: string;
// 	semester: number;
// 	department: Department;
// 	dateOfRequest: string;
// 	periods: number[];
// 	status: string;
// 	purpose: string | null;
// }

// export interface UserReport {
//   id: string;
//   staffName: string;
//   date: string;
//   timing: string;
//   status: string;
//   issue: string;
//   systemNo: number[];
// }

// export interface UserDepartment {
//   id: string;
//   name: string;
//   batch: string | null;
// }

// export interface UserLabData {
// 	id: string;
// 	labName: string;
// 	capacity: number;
// 	report: ReportNew[];
// 	reservation: ReservationNew[];
// 	timeTable: LabTimeTable[];
// }

export interface UserContextData {
  id: string;
  authId: string;
  registerNumber: string;
  name: string;
  gender: string;
  email: string;
  phoneNumber: string;
  department: UserDepartment;
  timeTable: TimeTableByDay[];
  reservation: ReservationData[];
  report: UserReportData[];
  notifications: string[] | null;
  labAdmin: boolean;
  labIncharge: boolean;
  lab: string | null;
  labData: LabData | null;
};

export interface UserDepartment {
  id: string;
  name: string;
};

// Teacher TimeTable

export interface TimeTableByDay {
  day: string;
  periods: TimeTablePeriod[];
};

export interface Staff {
  staffID: string;
  staffName: string;
};

export interface TimeTablePeriod {
  id: string;
  periodName: string | null | undefined;
  staff: Staff[] | null;
  batch: string | null;
  department: Department | null | undefined;
  semester: number | null;
  periodNo: number;
  labName: string | null;
};

// Lab TimeTable

export interface LabTimeTableByDay {
  day: string;
  periods: LabTimeTablePeriod[];
};

export interface LabTimeTablePeriod {
  id: string;
  periodName: string | null;
  staff: Staff[] | null;
  batch: string | null2;
  semester: number | null;
  department: Department | null;
  periodNo: number;
};

// Reservation

export interface ReservationData {
  id: string;
  semester: number | null;
  batch: string | null;
  department: UserDepartment;
  dateOfRequest: string;
  periods: ReservationPeriod[];
  labName: string;
  purpose: string | null;
  status: string;
};

export interface UserReservation {
  id: string;
  staffName: string;
  semester: number | null;
  batch: string | null;
  department: Department;
  dateOfRequest: string;
  periods: ReservationPeriod[];
  labName: string;
  status: string;
  purpose: string | null;
};

export interface ReservationPeriod {
  id: string;
  periodNo: number;
  day: string;
  date: string;
};

// Reports

export interface UserReportData {
  id: string;
  date: string;
  timing: string;
  labName: string;
  issue: string;
  status: string;
  systemNo: number[];
};

export interface UserReport {
  id: string;
  staffName: string;
  date: string;
  timing: string;
  status: string;
  issue: string;
  systemNo: number[];
};

// Lab Data

export interface UserLabData {
  id: string;
  labName: string;
  capacity: number;
  labName: string;
  report: LabSideReport[];
  reservation: LabSideReservation[];
  timeTable: LabTimeTableByDay[];
};
