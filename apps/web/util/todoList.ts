/* eslint-disable import/extensions */
import { Data, Status, Type } from '@/types/Todo.d';

const todoList: Data[] = [
  {
    id: 'R0',
    staffName: 'Kishore Sebastian',
    date: 'March 22, 2023',
    timing: '09:45 AM',
    venue: 'Software Computing Lab',
    issue: '',
    status: Status.Pending,
    systemNo: [51, 22],
    type: Type.ReportedIssue,
  },
  {
    id: 'R1',
    date: 'March 22, 2023',
    timing: '09:45 AM',
    issue: '',
    systemNo: [51, 22],
    type: Type.Task,
  },
];

export default todoList;
