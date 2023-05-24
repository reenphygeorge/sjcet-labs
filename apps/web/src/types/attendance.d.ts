interface StudentAttendanceData {
  id: string;
  rollNo: string;
  name: string;
  systemNo: string;
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
  systemNo: string;
}

export { StudentAttendanceData, LabDetails, FreeSystems, AttendanceStatus };
