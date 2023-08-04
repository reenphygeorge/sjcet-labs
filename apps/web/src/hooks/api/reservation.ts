/* eslint-disable import/extensions */
import { apiHandler } from '@/config/handler';
import { LabBookingDetails } from '@/types/BookLab';

const config = {
  headers: {
    'Content-Type': 'application/json',
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

const deleteReservation = async (reservationInfo: string) => {
  const { data } = await apiHandler.delete(
    `/reservation/delete?reservationInfo=${reservationInfo}`
  );
  return data;
};

const reviewReservation = async (reservationId: string, status: 'APPROVED' | 'REJECTED') => {
  const { data } = await apiHandler.patch(`/reservation/review`, {
    reservationId,
    status,
  });
  return data;
};

export { getFreeLabs, getLabRervations, bookLab, deleteReservation, reviewReservation };
