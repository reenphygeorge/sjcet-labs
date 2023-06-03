import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getUserService } from '../services/userService';
import errorHandler from '../helpers/handlers/ErrorHandler';
import logger from '../helpers/logger/logger.init';

const router = express.Router();

// Sample route handler
const userRoute = router.get('/', async (request: Request, response: Response) => {
  try {
    //   Geting Sample Data
    const data = await getUserService(request.body.authId);
    // Call the responsehandler to send the response instead of response.json({})
    logger.info(data)
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    // Overwrite the error message if required
    const message = 'Failed to retrieve user data';
    error.message = message;
    // call the errorHandler
    errorHandler(error, request, response);
  }
});

// const userPost = router.post('/post', async (request:Request, response: Response) => {
//   try {
//     let name = request.body.name
//     let batches = request.body.batches
//     console.log('Got Post ', name, batches)
//     await postUserData(name, batches)
//     response.send('Reveived Data')
//   } catch(error: Error | any) {
//     // Overwrite the error message if required
//     const message = 'Failed to post user data';
//     error.message = message;
//     // call the errorHandler
//     errorHandler(error, request, response);
//   }
// })

export { userRoute };
