interface Period {
  id: string;
  periodName: string;
  semester: string;
  branch: string;
  timing: string;
  day: string;
  batch: string;
  venue: string;
  roomNo: string;
}

interface Day {
  periods: Period[];
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

export { Period, Day, Timetable, TimetableCardProps, Options };
