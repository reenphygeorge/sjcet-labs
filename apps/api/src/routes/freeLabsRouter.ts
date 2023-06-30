import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { getFreeLabsInfo } from '../services/freeLabsService';
import { FreeLabRequestInfo } from '../helpers/types/user';

const router = express.Router()

const freeLabsRouter = router.get('/', async (request: Request, response: Response) => {
	try {
		let labInfo: FreeLabRequestInfo = {
			day: request.body.day,
			periodNumbers: request.body.periodNumbers
		}
		const data = await getFreeLabsInfo(labInfo)
		responseHandler(data, request, response);
	} catch(error: Error | any) {
		const message = 'Failed to get free lab data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { freeLabsRouter }