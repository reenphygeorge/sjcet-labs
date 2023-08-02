import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { getFreeLabsInfo, getLabReservationInfo } from '../services/freeLabsService';

const router = express.Router();

const availableLabs = router.get('/availableLabs', async (request: Request, response: Response) => {
  try {
    const { capacity } = request.query;
    const data = await getFreeLabsInfo(Number(capacity));
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to get free lab data';
    error.message = message;
    errorHandler(error, request, response);
  }
});

const labReservations = router.get(
  '/reservations',
  async (request: Request, response: Response) => {
    try {
      const labId = request.query.labId as string;
      const data = await getLabReservationInfo(labId);
      responseHandler(data, request, response);
    } catch (error: Error | any) {
      const message = 'Failed to get free lab data';
      error.message = message;
      errorHandler(error, request, response);
    }
  }
);

export { labReservations, availableLabs };
