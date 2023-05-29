import { Data, Status } from '@/types/Reports.d';

const reportList: Data[] = [
  {
    id: 'R0',
    date: 'March 22, 2023',
    staffName: 'Kishore Sebastian',
    timing: '09:45 AM',
    venue: 'Software Computing Lab',
    issue: '',
    status: Status.Pending,
    systemNo: [51, 22],
  },
  {
    id: 'R1',
    date: 'March 22, 2023',
    staffName: 'Kishore Sebastian',
    timing: '09:45 AM',
    venue: 'Programming Lab',
    issue: '',
    status: Status.InProgress,
    systemNo: [12],
  },
  {
    id: 'R2',
    date: 'March 22, 2023',
    staffName: 'Sarju S',
    timing: '09:45 AM',
    venue: 'Network Lab',
    issue: '',
    status: Status.Pending,
    systemNo: [10, 24, 51],
  },
];

export default reportList;
