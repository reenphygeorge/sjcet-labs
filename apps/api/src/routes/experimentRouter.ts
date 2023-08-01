import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { getExperiments } from '../services/experimentService';

const router = express.Router();

const experimentRouter = router.post('/', async (request: Request, response: Response) => {
  try {
    const { courseCode } = request.body;
    const data = await getExperiments(courseCode);
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to retrieve experiment data';
    error.message = message;
    errorHandler(error, request, response);
  }
});

export { experimentRouter };
