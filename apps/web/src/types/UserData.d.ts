import { ReservationInfo } from './BookLab';

type UserContextProps = {
  userData: UserContextData;
  setUserData: (data: UserContextData) => void;
};

type Profile = {
  id?: string;
  registerNumber?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

type UserContextData = {
  id: string;
  authId: string;
  registerNumber: string;
  name: string;
  gender: string;
  email: string;
  phoneNumber: string;
  department: Department;
  labAdmin: boolean;
  labIncharge: boolean;
  timeTable: TimeTableByDay[];
  reservation: ReservationData[];
  report: ReportData[];
  notifications: string[];
  lab: string | null;
  labData: LabData | null;
};

type Department = {
  id: string;
  name: string;
};

// Teacher TimeTable

type TimeTableByDay = {
  day: string;
  periods: TimeTablePeriod[];
};

type Staff = {
  staffID: string;
  staffName: string;
};

type TimeTablePeriod = {
  id: string;
  periodName: string | null;
  staff: Staff[] | null;
  batch: string | null;
  department: Department | null;
  semester: number | null;
  periodNo: number;
  labName: string | null;
  roomNo: string | null;
  reservationStatus: ReservationInfo | null;
};

// Lab TimeTable

type LabTimeTableByDay = {
  day: string;
  periods: LabTimeTablePeriod[];
};

type LabTimeTablePeriod = {
  id: string;
  periodName: string | null;
  staff: Staff[] | null;
  batch: string | null2;
  semester: number | null;
  department: Department | null;
  periodNo: number;
};

// Reservation

type ReservationData = {
  id: string;
  semester: number | null;
  batch: string;
  department: Department;
  dateOfRequest: string;
  periods: ReservationPeriod[];
  labName: string;
  purpose: string;
  status: string;
};

type LabSideReservation = {
  id: string;
  staffName: string;
  semester: number | null;
  batch: string | null;
  department: Department;
  dateOfRequest: string;
  periods: ReservationPeriod[];
  labName: string;
  status: string;
  purpose: string;
};

type ReservationPeriod = {
  id: string;
  periodNo: number;
  date: string;
};

// Reports

type ReportData = {
  id: string;
  date: string;
  timing: string;
  labName: string;
  issue: string;
  status: string;
  systemNo: number[];
};

type LabSideReport = {
  id: string;
  staffName: string;
  date: string;
  timing: string;
  status: string;
  issue: string;
  systemNo: number[];
};

// Lab Data

type LabData = {
  id: string;
  labName: string;
  capacity: number;
  roomNumber: string;
  labName: string;
  report: LabSideReport[];
  reservation: LabSideReservation[];
  timeTable: LabTimeTableByDay[];
};

export {
  UserContextData,
  UserContextProps,
  TimeTableByDay,
  Profile,
  LabTimeTableByDay,
  ReservationData,
  ReportData,
  LabSideReport,
  LabSideReservation,
};
