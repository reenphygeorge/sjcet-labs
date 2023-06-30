type Data = {
  id: string;
  labName: string;
  status: string;
  reservationDetails: ReservationInfo | null;
};

type ReservationInfo = {
  id: string;
  labName: string;
  staffName: string;
  semester: number;
  departmentWithBatch: string;
  date: string;
  purpose: string;
  negotiable: boolean;
  phone: string;
};

type LabDetailsforBooking = {
  data: Data[];
};

export { LabDetailsforBooking };
