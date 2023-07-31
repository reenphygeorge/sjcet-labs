type Options = {
  id: string;
  value: string | number;
};

type SelectedPeriod = {
  id: string;
  periodNo: number;
  day: string;
};

type ReservationInfo = {
  id: string;
  staffName: string;
  semester: number;
  departmentWithBatch: string;
  date: string;
  labName: string;
  purpose: string;
  negotiable: boolean;
  phone: string;
};

type LabData = {
  id: string;
  name: string;
  roomNo: string;
  status: 'Reserved' | 'Available' | 'ClassTime';
  reservationInfo?: ReservationInfo;
};

type LabDetails = {
  data: LabData[];
};

type LabBookingDetails = {
  professorId: string | null;
  semester: number | null;
  teachingDepartmentsId: string;
  dayId: string;
  batch: string;
  labId: string;
  periods: number[];
  negotiable: boolean;
  purpose: string;
};

export { Options, SelectedPeriod, ReservationInfo, LabData, LabDetails, LabBookingDetails };
