import { UserContextData } from '@/types/UserData.d';
import timetableData from './TimeTableData';

const fetchUserData = (): UserContextData => ({
  id: 'b6b6f95d-654e-4d06-abc6-7cd66e4bb1c3',
  authId: '61d84453-f8a0-4895-ac6c-67ab07e6e85b',
  registerNumber: 'CSE102',
  name: 'Kishore Sebastian',
  gender: 'Male',
  email: 'kishoresebastian@gmail.com',
  phoneNumber: '9278267212',
  department: {
    id: '8d7a4429-3a29-4c87-94d3-b64c1b9072f0',
    name: 'CSE',
    batch: 'A',
  },
  labAdmin: false,
  labIncharge: true,
  lab: 'Networks Lab',
  timeTable: timetableData,
  reservation: [
    {
      id: 'fywvekuyek',
      semester: 'S6',
      department: {
        id: 'ewjhgvbm-8677-de34-wd66-ecwc4we3c4wed',
        name: 'CSE',
        batch: 'B',
      },
      dateOfRequest: 'April 22, 2023',
      periods: [
        { id: 'R1234567', periodNo: '2', date: 'April 22, 2023' },
        { id: 'R0987654', periodNo: '3', date: 'April 22, 2023' },
      ],
      venue: 'Software Computing Lab',
      purpose: '',
      status: 'Requested',
    },
    {
      id: 'ejgvbkjehgka',
      semester: 'S6',
      department: {
        id: 'ewjhgvbm-8677-de34-wd66-ecwc4we3c4wed',
        name: 'CSE',
        batch: 'B',
      },
      dateOfRequest: 'April 22, 2023',
      periods: [
        { id: 'Rkihkuykh', periodNo: '4', date: 'April 25, 2023' },
        { id: 'Ruerliwun', periodNo: '5', date: 'April 25, 2023' },
      ],
      venue: 'Software Computing Lab',
      purpose: '',
      status: 'Aproved',
    },
  ],
  notifications: [],
  report: [
    {
      id: 'R0',
      date: 'April 22, 2023',
      timing: '09:45 AM',
      venue: 'Software Computing Lab',
      issue: '',
      status: 'Pending',
      systemNo: [51, 22],
    },
    {
      id: 'R1',
      date: 'April 22, 2023',
      timing: '09:45 AM',
      venue: 'Programming Lab',
      issue: '',
      status: 'Resolved',
      systemNo: [12],
    },
  ],
  labData: {
    id: 'd83cd966-dfcc-4ca5-aa65-88f18ac9f681',
    labName: 'Networks Lab',
    capacity: 32,
    roomNumber: '72',
    venue: 'SJPB',
    report: [],
    reservation: [],
  },
});

export default fetchUserData;
