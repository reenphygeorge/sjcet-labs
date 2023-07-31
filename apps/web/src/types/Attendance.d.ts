type StudentAttendanceData = {
  id: string;
  rollNo: string;
  name: string;
  systemNo: number;
  attendanceStatus: 'Present' | 'Absent';
};

type Data = {
  id: string;
  name: string;
  roomNo: string;
};

type FreeSystems = {
  id: string;
  systemNo: number;
};

export { StudentAttendanceData, FreeSystems };
