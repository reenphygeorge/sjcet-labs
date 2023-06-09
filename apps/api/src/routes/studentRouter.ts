import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import { getStudentService } from '../services/studentService';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { StudentInfo } from '../helpers/types/user';

const router = express.Router()

const studentRouter = router.get('/', async (request: Request, response: Response) => {
	console.log(request.body)
	try {
		const studentInfo: StudentInfo = {
			departmentId: request.body.departmentId,
			semester: request.body.semester,
			batch: request.body.batch,
			labBatch: request.body.labBatch
		}
		const data = await getStudentService(studentInfo);
		responseHandler(data, request, response);	
	  } catch (error: Error | any) {
		const message = 'Failed to retrieve student data';
		error.message = message;
		errorHandler(error, request, response);
	  }
})

export { studentRouter }