type Day = {
  id: string;
  value: string;
  day: string;
};

type Semester = {
  id: string;
  value: number;
};

type Department = {
  id: string;
  name: string;
};

type SelectedPeriod = {
  id: string;
  periodNo: number;
  day: string;
};

type LabSelectProps = {
  id: string;
  labName: string;
  labReservationInfo: ReservationInfo[];
};

// type LabData = {
//   id: string;
//   name: string;
//   roomNo: string;
//   status: 'Reserved' | 'Available' | 'ClassTime';
//   reservationInfo?: ReservationInfo;
// };

// type LabDetails = {
//   data: LabData[];
// };

type LabBookingDetails = {
  professorId: string;
  semester: number;
  teachingDepartmentsId: string;
  dayId: string;
  batch: string;
  labId: string;
  periods: number[];
  negotiable: boolean;
  purpose: string;
};

// New

type ReservationInfo = {
  id: string;
  dayId: string;
  periodNumber: number;
  staffName: string;
  departmentWithBatch: string;
  semester: number;
  purpose: string;
  negotiable: boolean;
  phone: string;
};

type BookLabSubmitData = {
  professorId: string;
  dayId: string;
  negotiable: boolean;
  purpose?: string;
  semester: number;
  batch: string;
  periodNumber: number[];
  batch: string;
  teachingDepartmentId: string;
  labId: string;
};

type AvailableLabs = {
  id: string;
  labName: string;
};

type LabData = {
  labId: string;
  labName: string;
};

type BookLabContextProps = {
  availableLabs: AvailableLabs[] | undefined;
  setAvailableLabs: (data: AvailableLabs[]) => void;
  reservationInfo: ReservationInfo[] | undefined;
  setReservationInfo: (reservationData: ReservationInfo[]) => void;
  labCapacity: number;
  setLabCapacity: (labCapacity: number) => void;
  labData: LabData;
  setLabData: (labId: LabData) => void;
};

export {
  Day,
  Semester,
  Department,
  SelectedPeriod,
  ReservationInfo,
  BookLabContextProps,
  AvailableLabs,
  LabSelectProps,
  LabData,
  LabBookingDetails,
};
