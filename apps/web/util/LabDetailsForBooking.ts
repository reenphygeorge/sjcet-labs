import { LabDetailsforBooking } from '@/types/LabDetailsforBooking.d';

const labDetailsforBooking: LabDetailsforBooking = {
  data: [
    {
      id: '0',
      name: 'Software Computing Lab',
      roomNo: 'MTB 101',
      status: 'Available',
      reservationDetails: null,
    },
    {
      id: '1',
      name: 'Programming Lab',
      roomNo: 'MTB 101',
      status: 'Reserved',
      reservationDetails: {
        id: 'ferhgbcvkfuy',
        staffName: 'Prof. Mereen Thomas',
        semester: 6,
        departmentWithBatch: 'CSE-B',
        date: 'April 22, 2023',
        venue: 'Programming Lab',
        purpose: '',
        negotiable: true,
        phone: '+9190123456789',
      },
    },
    {
      id: '2',
      name: 'Network Lab',
      roomNo: 'MTB 101',
      status: 'ClassTime',
      reservationDetails: null,
    },
    {
      id: '3',
      name: 'Research Lab',
      roomNo: 'MTB 101',
      status: 'available',
      reservationDetails: null,
    },
    {
      id: '4',
      name: 'Testing Lab',
      roomNo: 'MTB 101',
      status: 'available',
      reservationDetails: null,
    },
  ],
};

export default labDetailsforBooking;
