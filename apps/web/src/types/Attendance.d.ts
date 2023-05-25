interface StudentAttendanceData {
  id: string;
  rollNo: string;
  name: string;
  systemNo: number;
  attendanceStatus: AttendanceStatus;
}

enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
}

interface Data {
  id: string;
  name: string;
  roomNo: string;
}

interface LabDetails {
  data: Data[];
}

interface FreeSystems {
  id: string;
  systemNo: number;
}

export { StudentAttendanceData, LabDetails, FreeSystems, AttendanceStatus };
