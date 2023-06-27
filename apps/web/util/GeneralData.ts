import { GeneralContextProps } from '@/types/GeneralData.d';

const fetchGeneralData = (): GeneralContextProps => ({
  departments: [
    {
      id: '8d7a4429-3a29-4c87-94d3-b64c1b9072f0',
      name: 'CSE',
      batch: 'A',
    },
    {
      id: 'ewjhgvbm-8677-de34-wd66-ecwc4we3c4wed',
      name: 'CSE',
      batch: 'B',
    },
    {
      id: 'cc0e8d2b-7f73-48ee-bb2e-d2bf15927241',
      name: 'EEE',
      batch: 'A',
    },
  ],
  labs: [
    {
      id: 'ca7d5cb0-540d-4dfb-b6e4-42f311dd199b',
      labName: 'Software Computing Lab',
      capacity: 65,
      roomNumber: '283',
      venue: 'MTB',
    },
    {
      id: 'd83cd966-dfcc-4ca5-aa65-88f18ac9f681',
      labName: 'Networks Lab',
      capacity: 32,
      roomNumber: '72',
      venue: 'SJPB',
    },
    {
      id: 'a90e7652-90bc-4259-b73a-bbdf5f5abfdc',
      labName: 'Programming Lab',
      capacity: 32,
      roomNumber: '110',
      venue: 'MTB',
    },
  ],
});

export default fetchGeneralData;
