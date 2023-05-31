import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getUserService, postUserData } from '../services/userService';
import errorHandler from '../helpers/handlers/ErrorHandler';

const router = express.Router();

// Sample route handler
const userRoute = router.get('/:authId', async (request: Request, response: Response) => {
  try {
    //   Geting Sample Data
    const data = await getUserService(request.params.authId);
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

const userPost = router.post('/post', async (request:Request, response: Response) => {
  try {
    let name = request.body.name
    let batches = request.body.batches
    console.log('Got Post ', name, batches)
    await postUserData(name, batches)
    response.send('Reveived Data')
  } catch(error: Error | any) {
    // Overwrite the error message if required
    const message = 'Failed to post user data';
    error.message = message;
    // call the errorHandler
    errorHandler(error, request, response);
  }
})

export { userRoute, userPost };
