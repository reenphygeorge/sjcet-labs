interface Options {
  id: string;
  value: string | number;
}

interface SelectedPeriod {
  id: string;
  periodNo: number;
  day: string;
}

interface ReservationInfo {
  id: string;
  staffName: string;
  semester: number;
  departmentWithBatch: string;
  date: string;
  labName: string;
  purpose: string;
  negotiable: boolean;
  phone: string;
}

interface LabData {
  id: string;
  name: string;
  roomNo: string;
  status: Status;
  reservationInfo?: ReservationInfo;
}

interface LabDetails {
  data: LabData[];
}

interface LabBookingDetails {
  professorId: string | null;
  semester: number | null;
  teachingDepartmentsId: string;
  dayId: string;
  batch: string;
  labId: string;
  periods: number[];
  negotiable: boolean;
  purpose: string;
}

enum Status {
  Reserved = 'Reserved',
  Available = 'Available',
  ClassTime = 'ClassTime',
}

export { Options, SelectedPeriod, ReservationInfo, LabData, LabDetails, LabBookingDetails, Status };
