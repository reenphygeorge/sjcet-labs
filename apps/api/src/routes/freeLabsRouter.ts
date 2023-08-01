import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { getFreeLabsInfo } from '../services/freeLabsService';

const router = express.Router();

const freeLabsRouter = router.post('/', async (request: Request, response: Response) => {
  try {
    const { labId } = request.body;
    const data = await getFreeLabsInfo(labId);
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to get free lab data';
    error.message = message;
    errorHandler(error, request, response);
  }
});

export { freeLabsRouter };
