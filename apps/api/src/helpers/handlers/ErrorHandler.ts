import { Request, Response } from 'express';
import logger from '../logger/logger.init';
import { ErrorResponse } from '../types/ErrorHandler';

const errorHandler = (error: Error, request: Request, response: Response) => {
  logger.error(error.message);
  const errorResponse: ErrorResponse = {
    success: false,
    error: error.message,
  };
  response.status(500).json(errorResponse);
};

export default errorHandler;
