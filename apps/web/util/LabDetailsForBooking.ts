import { LabDetailsforBooking } from '@/types/LabDetailsforBooking.d';

const labDetailsforBooking: LabDetailsforBooking = {
  data: [
    {
      id: 'cca69a7d-57c8-4ed8-b17e-b9c084c092a6',
      labName: 'Software Computing Lab',
      status: 'Available',
      reservationDetails: null,
    },
    {
      id: 'ca162b6a-33bf-49c0-8c7b-9e4e1b0c0be0',
      labName: 'Programming Lab',
      status: 'Reserved',
      reservationDetails: {
        id: 'ferhgbcvkfuy',
        labName: 'Software Lab',
        staffName: 'Prof. Mereen Thomas',
        semester: 6,
        departmentWithBatch: 'CSE-B',
        date: 'April 22, 2023',
        purpose: '',
        negotiable: true,
        phone: '+9190123456789',
      },
    },
    {
      id: '51e711e6-141e-4735-8343-79a1488c58e1',
      labName: 'Network Lab',
      status: 'ClassTime',
      reservationDetails: null,
    },
    {
      id: '4ef454db-4cb6-4a95-8f03-7a3bc8edf452',
      labName: 'Research Lab',
      status: 'available',
      reservationDetails: null,
    },
  ],
};

export default labDetailsforBooking;
