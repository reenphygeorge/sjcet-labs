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
  systemNo: NumberOptions[];
  venue: string;
  issue: string;
};

type ResolveInfo = {
  comment: string;
};

export { LabList, NewReportData, ResolveInfo };
