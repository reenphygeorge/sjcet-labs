type GeneralContextProps = {
  departments: Department[];
  labs: Lab[];
};

type Department = {
  id: string;
  name: string;
};

type Lab = {
  id: string;
  labName: string;
  capacity: number;
};

export { GeneralContextProps, Department, Lab };
