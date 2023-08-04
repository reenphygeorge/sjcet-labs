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
  professorId: string | null;
  systems: number[];
  labId: string;
  issueDescription: string;
};

export { LabList, NewReportData };
