import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getUserService, patchUserData } from '../services/userService';
import errorHandler from '../helpers/handlers/ErrorHandler';

const router = express.Router();

const userGet = router.get('/', async (request: Request, response: Response) => {
  try {
    const authId = request.body.authId;
    const data = await getUserService(authId);
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to retrieve user data';
    error.message = message;
    errorHandler(error, request, response);
  }
});
const userPatch = router.patch('/', async (request: Request, response: Response) => {
  try {
    const returnedData = await patchUserData(request.body);
    responseHandler(returnedData, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to patch user data';
    error.message = message;
    errorHandler(error, request, response);
  }
});

export { userGet, userPatch };
