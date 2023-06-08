import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import {getDepartmentService} from '../services/departmentService'

const router = express.Router()

const departmentGet = router.get('/', async (request: Request, response: Response) => {
	try {
		const data = await getDepartmentService();
		responseHandler(data, request, response);
	} catch (error: Error | any) {
		const message = 'Failed to retrieve department data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { departmentGet }