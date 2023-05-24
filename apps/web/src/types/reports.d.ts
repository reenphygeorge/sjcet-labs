interface Data {
  id: string;
  date: string;
  timing: string;
  venue: string;
  issue: string;
  status: string;
  systemNo: number[];
}

interface SystemNos {
  value: String;
  label: String;
}

enum Status {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export { Data, Status };
