import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getUserService, patchUserData } from '../services/userService';
import errorHandler from '../helpers/handlers/ErrorHandler';

const router = express.Router();

const userGet = router.get('/getUser/:authId', async (request: Request, response: Response) => {
  try {
    const { authId } = request.params;
    const data = await getUserService(authId);

    if (data === null) {
      const message = 'User Not Found';
      const error = new Error(message);
      errorHandler(error, request, response);
    }
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to retrieve user data';
    error.message = message;
    errorHandler(error, request, response);
  }
});

const userPatch = router.patch('/patchUser', async (request: Request, response: Response) => {
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
