import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { viewNotifications, deleteNotifications } from '../services/notificationService';

const router = express.Router();

const notificationViewRoute = router.patch(
  '/view',
  async (request: Request, response: Response) => {
    try {
      const { notificationId } = request.body;
      const data = await viewNotifications(notificationId);
      responseHandler(data, request, response);
    } catch (error: Error | any) {
      const message = 'Failed to view notifications';
      error.message = message;
      errorHandler(error, request, response);
    }
  }
);

const notificationDeleteRoute = router.delete(
  '/delete',
  async (request: Request, response: Response) => {
    try {
      const { notificationIds } = request.body;
      const data = await deleteNotifications(notificationIds);
      responseHandler(data, request, response);
    } catch (error: Error | any) {
      const message = 'Failed to delete notifications';
      error.message = message;
      errorHandler(error, request, response);
    }
  }
);

export { notificationViewRoute, notificationDeleteRoute };
