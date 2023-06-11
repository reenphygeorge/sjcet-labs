import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { getLogs } from '../services/logService';
import { LogData } from '../helpers/types/user';

const router = express.Router()

const getLog = router.get('/', async (request: Request, response: Response) => {
	try {
		const logData: LogData = {
			date: new Date(request.body.date),
			labName: request.body.labName,
			periods: request.body.periods
		}
		const data = await getLogs(logData);
		responseHandler(data, request, response);
	} catch (error: Error | any) {
		const message = 'Failed to retrieve log data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { getLog }
