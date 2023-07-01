/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { UserContextData } from '@/types/UserData.d';
import timetableData from './TimeTableData';
import labTimetableData from './LabTimeTable';
import env from '@/config/env';

const fetchUserData = (): UserContextData => ({
  id: 'b0b1e662-8b04-4aad-b510-0c55727074c9',
  authId: '61d84453-f8a0-4895-ac6c-67ab07e6e85b',
  registerNumber: 'CSE004',
  name: 'Kishore Sebastian',
  gender: 'Male',
  email: 'kishoresebastian@gmail.com',
  phoneNumber: '9278267212',
  department: {
    id: '8d7a4429-3a29-4c87-94d3-b64c1b9072f0',
    name: 'CSE',
  },
  labAdmin: false,
  labIncharge: true,
  lab: 'Networks Lab',
  timeTable: timetableData,
  reservation: [
    {
      id: 'fywvekuyek',
      semester: 6,
      batch: 'B',
      department: {
        id: 'ewjhgvbm-8677-de34-wd66-ecwc4we3c4wed',
        name: 'CSE',
      },
      dateOfRequest: 'April 22, 2023',
      periods: [
        { id: 'R1234567', periodNo: 2, date: 'April 22, 2023' },
        { id: 'R0987654', periodNo: 3, date: 'April 22, 2023' },
      ],
      labName: 'Software Computing Lab',
      purpose: '',
      status: 'Requested',
    },
    {
      id: 'ejgvbkjehgka',
      semester: 6,
      batch: 'B',
      department: {
        id: 'ewjhgvbm-8677-de34-wd66-ecwc4we3c4wed',
        name: 'CSE',
      },
      dateOfRequest: 'April 22, 2023',
      periods: [
        { id: 'Rkihkuykh', periodNo: 4, date: 'April 25, 2023' },
        { id: 'Ruerliwun', periodNo: 5, date: 'April 25, 2023' },
      ],
      labName: 'Software Computing Lab',
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
      labName: 'Software Computing Lab',
      issue: '',
      status: 'Pending',
      systemNo: [51, 22],
    },
    {
      id: 'R1',
      date: 'April 22, 2023',
      timing: '09:45 AM',
      labName: 'Programming Lab',
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
    report: [
      {
        id: 'R0',
        staffName: 'Prof. Kishore',
        date: 'April 22, 2023',
        timing: '09:45 AM',
        status: 'Pending',
        issue: '',
        systemNo: [51, 22],
      },
      {
        id: 'R1',
        staffName: 'Prof. Mereen',
        date: 'April 22, 2023',
        status: 'Pending',
        timing: '09:45 AM',
        issue: '',
        systemNo: [12],
      },
    ],
    reservation: [
      {
        id: 'R0',
        staffName: 'Prof. Mereen',
        semester: 6,
        batch: 'B',
        department: {
          id: 'yebcwtfxfew',
          name: 'CSE',
        },
        dateOfRequest: 'April 22, 2023',
        periods: [{ id: '1', periodNo: 5, date: '12-2' }],
        labName: 'Software Computing Lab',
        status: 'Requested',
        purpose: '',
      },
    ],
    timeTable: labTimetableData,
  },
});

type Profile = {
  id?: string;
  registerNumber?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

const patchUser = async (data: Profile) => {
  try {
    await axios.patch(`${env.apiDomain}/user`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('Response:', response.data);
    // Handle the response as needed
  } catch (error) {
    // console.error('Error:', error);
    // Handle the error as needed
  }
};

export default fetchUserData;

export { patchUser };
