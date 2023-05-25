interface RouteOptions {
  id: string;
  value: string;
  route: string;
}

interface Profile {
  id: string;
  collegeID: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  gender: Gender;
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export { RouteOptions, Profile, Gender };
