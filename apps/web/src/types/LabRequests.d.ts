interface RequestData {
  id: string;
  staffName: string;
  semester: string;
  departmentWithBatch: string;
  dateOfRequest: string;
  periods: Period[];
  venue: string;
  purpose: string;
  status: string;
}

enum Status {
  Approved = 'Approved',
  Requested = 'Requested',
}

interface Period {
  id: string;
  periodNo: string;
  date: string;
}

export { Status, RequestData };
