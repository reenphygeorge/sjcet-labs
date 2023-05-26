import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getUserService } from '../services/userService';
import errorHandler from '../helpers/handlers/ErrorHandler';

const router = express.Router();

// Sample route handler
const userRoute = router.get('/', async (request: Request, response: Response) => {
  try {
    //   Geting Sample Data
    const data = await getUserService();
    // Call the responsehandler to send the response instead of response.json({})
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    // Overwrite the error message if required
    const message = 'Failed to retrieve user data';
    error.message = message;
    // call the errorHandler
    errorHandler(error, request, response);
  }
});

export { userRoute };
