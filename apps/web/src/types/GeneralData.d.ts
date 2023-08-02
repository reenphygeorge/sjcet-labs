type GeneralContextProps = {
  data: GeneralContextData;
};

type GeneralContextData = {
  departments: Department[];
  courses: Course[];
  labs: Lab[];
};

type Department = {
  id: string;
  name: string;
};

type Course = {
  courseCode: '';
  courseName: '';
  isPractical: false;
};

type Lab = {
  id: string;
  labName: string;
  capacity: number;
};

export { GeneralContextProps, GeneralContextData, Department, Lab, Course };
