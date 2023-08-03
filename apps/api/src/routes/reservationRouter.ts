import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import {
  reservationCreate,
  reservationReview,
  reservationDelete,
} from '../services/reservationService';
import { ReviewInfo } from '../helpers/types/user';

const router = express.Router();

const createReservation = router.post('/create', async (request: Request, response: Response) => {
  try {
    const { reservationInfo } = request.body;
    const data = await reservationCreate(reservationInfo);
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to create reservation';
    error.message = message;
    errorHandler(error, request, response);
  }
});

const reviewReservation = router.patch('/review', async (request: Request, response: Response) => {
  try {
    const reviewInfo: ReviewInfo = request.body;
    const data = await reservationReview(reviewInfo);
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to review reservation';
    error.message = message;
    errorHandler(error, request, response);
  }
});

const deleteReservation = router.delete('/delete', async (request: Request, response: Response) => {
  try {
    const { reservationInfo } = request.query;
    const data = await reservationDelete(String(reservationInfo));
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to delete reservation';
    error.message = message;
    errorHandler(error, request, response);
  }
});

export { createReservation, reviewReservation, deleteReservation };
