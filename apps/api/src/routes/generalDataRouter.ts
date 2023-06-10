import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import {getGeneralData} from '../services/generalDataService'

const router = express.Router()

const testRoute = router.get('/', (request: Request, response: Response) => {
	const data = {
		message: "API Running Successfully"
	}
	responseHandler(data, request, response)
})

const generalDataGet = router.get('/generalData', async (request: Request, response: Response) => {
	try {
		const data = await getGeneralData();
		responseHandler(data, request, response);
	} catch (error: Error | any) {
		const message = 'Failed to retrieve general data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { generalDataGet, testRoute }