/* eslint-disable import/no-extraneous-dependencies */
import { nanoid } from 'nanoid';

const summaryForm = [
  {
    id: nanoid(),
    label: 'Semester',
    htmlFor: 'semester',
    value: 'S6',
    disabled: false,
    inputType: 'select',
    options: [
      {
        optionID: nanoid(),
        optionValue: 'S1',
      },
      {
        optionID: nanoid(),
        optionValue: 'S2',
      },
      {
        optionID: nanoid(),
        optionValue: 'S3',
      },
      {
        optionID: nanoid(),
        optionValue: 'S4',
      },
      {
        optionID: nanoid(),
        optionValue: 'S5',
      },
      {
        optionID: nanoid(),
        optionValue: 'S6',
      },
      {
        optionID: nanoid(),
        optionValue: 'S7',
      },
      {
        optionID: nanoid(),
        optionValue: 'S8',
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Department & Batch',
    htmlFor: 'department',
    disabled: false,
    inputType: 'select',
    options: [
      {
        optionID: nanoid(),
        optionValue: 'CSE-A',
      },
      {
        optionID: nanoid(),
        optionValue: 'CSE-B',
      },
      {
        optionID: nanoid(),
        optionValue: 'ME-A',
      },
      {
        optionID: nanoid(),
        optionValue: 'ME-B',
      },
      {
        optionID: nanoid(),
        optionValue: 'AD',
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Timing',
    htmlFor: 'Timing',
    disabled: true,
    inputType: 'react-select',
    selectOptions: [
      { value: '9:00AM - 9:55AM', label: '9:00AM - 9:55AM' },
      { value: '10:00AM - 10:55AM', label: '10:00AM - 10:55AM' },
      { value: '11:10AM - 12:00PM', label: '11:10AM - 12:00PM' },
      { value: '12:00PM - 12:45PM', label: '12:00PM - 12:45PM' },
      { value: '01:35PM - 02:30PM', label: '01:35PM - 02:30PM' },
      { value: '03:35PM - 04:30PM', label: '03:35PM - 04:30PM' },
    ],
  },
  {
    id: nanoid(),
    label: 'Venue',
    htmlFor: 'venue',
    value: 'Software Computing Lab',
    disabled: true,
    inputType: 'type',
  },
  {
    id: nanoid(),
    label: 'Level of need',
    htmlFor: 'Level-of-need',
    value: 'Negotiable',
    disabled: false,
    inputType: 'select',
    options: [
      {
        optionID: nanoid(),
        optionValue: 'Negotiable',
      },
      {
        optionID: nanoid(),
        optionValue: 'Non-Negotiable',
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Purpose',
    htmlFor: 'purpose',
    disabled: false,
    inputType: 'type',
    placeholder: '(optional)',
  },
];
export default summaryForm;
