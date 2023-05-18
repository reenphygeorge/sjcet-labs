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
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'S2',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'S3',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'S4',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'S5',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'S6',
        selected: true,
      },
      {
        optionID: nanoid(),
        optionValue: 'S7',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'S8',
        selected: false,
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Department',
    htmlFor: 'department',
    value: 'CSE',
    disabled: false,
    inputType: 'select',
    options: [
      {
        optionID: nanoid(),
        optionValue: 'CSE',
        selected: true,
      },
      {
        optionID: nanoid(),
        optionValue: 'ECE',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'ME',
        selected: false,
      },
      {
        optionID: nanoid(),
        optionValue: 'AD',
        selected: false,
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Batch',
    htmlFor: 'batch',
    value: 'B',
    disabled: false,
    inputType: 'select',
    options: [
      {
        optionID: nanoid(),
        optionValue: 'A',
        selected: true,
      },
      {
        optionID: nanoid(),
        optionValue: 'B',
        selected: false,
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Timing',
    htmlFor: 'Timing',
    value: '9:00 - 11:00',
    disabled: true,
    inputType: 'type',
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
        selected: true,
      },
      {
        optionID: nanoid(),
        optionValue: 'Non-Negotiable',
        selected: false,
      },
    ],
  },
  {
    id: nanoid(),
    label: 'Purpose',
    htmlFor: 'purpose',
    value: '',
    disabled: false,
    inputType: 'type',
  },
];
export default summaryForm;
