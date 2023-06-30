import { LabDetailsforBooking } from '@/types/LabDetailsforBooking.d';

const labDetailsforBooking: LabDetailsforBooking = {
  data: [
    {
      id: '0',
      labName: 'Software Computing Lab',
      status: 'Available',
      reservationDetails: null,
    },
    {
      id: '1',
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
      id: '2',
      labName: 'Network Lab',
      status: 'ClassTime',
      reservationDetails: null,
    },
    {
      id: '3',
      labName: 'Research Lab',
      status: 'available',
      reservationDetails: null,
    },
    {
      id: '4',
      labName: 'Testing Lab',
      status: 'available',
      reservationDetails: null,
    },
  ],
};

export default labDetailsforBooking;
