interface TeacherPeriod {
  id: string;
  periodName: string;
  semester: string;
  branch: string;
  timing: string;
  venue: string;
  roomNo: string;
}

interface LabAdminPeriod {
  id: string;
  periodName: string;
  inCharge: string;
  semester: string;
  branch: string;
  timing: string;
}

interface Day {
  day: string;
  periods: TeacherPeriod[];
}

interface Timetable {
  days: Day[];
}

interface TimetableCardProps {
  timetable: Timetable;
}

interface Options {
  id: string;
  value: string;
}

export { TeacherPeriod, LabAdminPeriod, Day, Timetable, TimetableCardProps, Options };
