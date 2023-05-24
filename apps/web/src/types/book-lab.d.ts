interface Options {
  id: string;
  value: string;
}

interface PeriodTiming {
  id: string;
  timing: string;
  day: string;
}

interface ReservationInfo {
  staffName: string;
  semester: string;
  departmentWithBatch: string;
  date: string;
  timing: string;
  venue: string;
  purpose: string;
  negotiable: boolean;
  phone: string;
}

interface LabData {
  id: string;
  name: string;
  roomNo: string;
  status: string;
  reservationInfo?: ReservationInfo;
}

interface LabDetails {
  data: LabData[];
}

interface LabBookingDetails {
  semester: string;
  departmentWithBatch: string;
  timings: PeriodTiming[] | string[];
  venue: string;
  negotiable: boolean;
  purpose: string;
}
export { Options, PeriodTiming, ReservationInfo, LabData, LabDetails, LabBookingDetails };
