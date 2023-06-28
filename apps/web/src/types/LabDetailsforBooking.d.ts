type Data = {
  id: string;
  name: string;
  roomNo: string;
  status: string;
  reservationDetails: ReservationInfo | null;
};

type ReservationInfo = {
  id: string;
  staffName: string;
  semester: number;
  departmentWithBatch: string;
  date: string;
  venue: string;
  purpose: string;
  negotiable: boolean;
  phone: string;
};

type LabDetailsforBooking = {
  data: Data[];
};

export { LabDetailsforBooking };
