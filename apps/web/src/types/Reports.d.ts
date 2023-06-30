import { NumberOptions } from './ReactSelect';

// type ReportData = {
//   id: string;
//   date: string;
//   timing: string;
//   venue: string;
//   issue: string;
//   status: string;
//   systemNo: number[];
// };

type LabList = {
  id: string;
  labName: string;
};

type SystemNos = {
  value: string;
  label: string;
};

type NewReportData = {
  registerNumber: string | null;
  systemNo: NumberOptions[];
  labName: string;
  issue: string;
};

export { LabList, NewReportData };
