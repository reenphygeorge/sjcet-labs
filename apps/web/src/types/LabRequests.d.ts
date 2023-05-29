interface RequestData {
  id: string;
  staffName: string;
  semester: string;
  departmentWithBatch: string;
  dateOfRequest: string;
  timings: Timings[];
  venue: string;
  purpose: string;
  status: string;
}

enum Status {
  Approved = 'Approved',
  Requested = 'Requested',
}

interface Timings {
  id: string;
  time: string;
  date: string;
}

export { Status, RequestData };
