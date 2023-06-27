type UserContextProps = {
  userData: UserContextData;
  setUserData: (data: UserContextData) => void;
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
  timeTable: TimeTableByDay[];
  reservation: ReservationData[];
  report: ReportData[];
  notifications: string[];
  labAdmin: boolean;
  labIncharge: boolean;
  lab: string | null;
  labData: LabData | null;
};

type Department = {
  id: string;
  name: string;
  batch: string;
};

// TimeTable

type TimeTableByDay = {
  day: string;
  periods: TimeTablePeriod[];
};

type InCharge = {
  inChargeID: string;
  name: string;
};

type TimeTablePeriod = {
  id: string;
  periodName: string | null;
  inCharge: InCharge[] | null;
  semester: string | null;
  branch: string | null;
  periodNo: string;
  venue: string | null;
  roomNo: string | null;
};

// Reservation

type ReservationData = {
  id: string;
  // staffName: string;
  semester: string;
  department: Department;
  dateOfRequest: string;
  periods: ReservationPeriod[];
  venue: string;
  purpose: string;
  status: string;
};

type ReservationPeriod = {
  id: string;
  periodNo: string;
  date: string;
};

// Reports

type ReportData = {
  id: string;
  date: string;
  timing: string;
  venue: string;
  issue: string;
  status: string;
  systemNo: number[];
};

// Lab Data

type LabData = {
  id: string;
  labName: string;
  capacity: number;
  roomNumber: string;
  venue: string;
  report: string[];
  reservation: string[];
};

export { UserContextData, UserContextProps, TimeTableByDay, ReservationData, ReportData };
