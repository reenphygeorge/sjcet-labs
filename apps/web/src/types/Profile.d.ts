interface ProfileData {
  collegeID: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  gender: Gender;
  role: Role;
  labInCharge: boolean;
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

enum Role {
  Teacher = 'Teacher',
  Administrator = 'Administrator',
}

interface Department {
  id: string;
  name: string;
}

export { ProfileData, Gender, Role, Department };
