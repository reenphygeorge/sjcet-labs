type GeneralContextProps = {
  departments: Department[];
  labs: Lab[];
};

type Department = {
  id: string;
  name: string;
  batch: string;
};

type Lab = {
  id: string;
  labName: string;
  capacity: number;
  roomNumber: string;
  venue: string;
};

export { GeneralContextProps, Department, Lab };
