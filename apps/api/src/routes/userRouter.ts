import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getUserService, patchUserData } from '../services/userService';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { PatchUserData } from '../helpers/types/user';
import logger from '../helpers/logger/logger.init';

const router = express.Router();

// Sample route handler
const userGet = router.get('/', async (request: Request, response: Response) => {
  try {
    //   Geting Sample Data
    const data = await getUserService(request.body.authId);
    // Call the responsehandler to send the response instead of response.json({})
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    // Overwrite the error message if required
    const message = 'Failed to retrieve user data';
    error.message = message;
    // call the errorHandler
    errorHandler(error, request, response);
  }
})
const userPatch = router.patch('/', async (request: Request, response: Response) => {
  logger.info(request.body)
  try {
    const data: PatchUserData = JSON.parse(request.body)
    // const returnedData = await patchUserData(data);
    // responseHandler(returnedData, request, response)
    response.send("Updated")
  } catch (error: Error | any) {
    const message = 'Failed to patch user data';
    error.message = message;
    errorHandler(error, request, response);
  }
});

export { userGet, userPatch };
