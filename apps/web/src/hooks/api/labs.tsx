/* eslint-disable import/extensions */
import { apiHandler } from '@/config/handler';
import { LabBookingDetails } from '@/types/BookLab';

const config = {
  headers: {
    'Content-Type': 'application/json', // Specify the content type for the request
  },
};

const getFreeLabs = async (capacity: number) => {
  const { data } = await apiHandler.get(`/labs/availableLabs?capacity=${capacity}`);
  return data;
};

const getLabRervations = async (labId: string) => {
  const { data } = await apiHandler.get(`/labs/reservations?labId=${labId}`);
  return data;
};

const bookLab = async (bookingData: LabBookingDetails) => {
  const { data } = await apiHandler.post(
    `/reservation/create`,
    { reservationInfo: bookingData },
    config
  );
  return data;
};

export { getFreeLabs, getLabRervations, bookLab };
