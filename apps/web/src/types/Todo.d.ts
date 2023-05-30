interface Data {
  id: string;
  staffName?: string;
  date: string;
  timing: string;
  venue?: string;
  issue: string;
  status?: Status;
  type: Type;
  priority?: Priority;
  systemNo: number[];
}

enum Status {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

enum Type {
  ReportedIssue = 'Reported Issue',
  Task = 'Task',
}

enum Priority {
  High = 'High',
  Moderate = 'Moderate',
  Low = 'Low',
}

interface LabList {
  id: string;
  labName: string;
}

interface NewTodoData {
  systemNo: NumberOptions[];
  issue: string;
  priority: Priority;
}

interface ResolveInfo {
  comment: string;
}

export { Data, Status, Priority, Type, LabList, NewTodoData, ResolveInfo };
