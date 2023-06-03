import { Request, Response } from 'express';
import { ResponseBody } from '../types/ResponseHandler';

const responseHandler = (data: unknown, request: Request, response: Response) => {
  const statusCode: number = request.method === 'POST' ? 201 : 200;
  const responseBody: ResponseBody = {
    success: true,
    data,
  };
  response.status(statusCode).json(responseBody);
};

export default responseHandler;
