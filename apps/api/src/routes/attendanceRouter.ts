import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { recordCreate, addStudentPositions, getStudentDetails, addAbsentStudents } from '../services/attendanceService';
import { AbsentStudents, AttendanceInfo, StudentPositions } from '../helpers/types/user';
import { StudentInfo } from '../helpers/types/user';

const router = express.Router()

const createRecord = router.post('/create', async (request: Request, response: Response) => {
	try {
		const attendanceInfo: AttendanceInfo = {
			date: new Date(request.body.date),
			courseCode: request.body.courseCode,
			experimentIds: request.body.experimentIds,
			labName: request.body.labName,
			periods: request.body.periods
		}
		const data = await recordCreate(attendanceInfo)
		responseHandler(data, request, response);	
	} catch (error: Error | any) {
		const message = 'Failed to create attendance record';
		error.message = message;
		errorHandler(error, request, response);
	}
})

const studentDetailsRouter = router.get('/studentDetails', async (request: Request, response: Response) => {
	try {
		const studentInfo: StudentInfo = {
			departmentId: request.body.departmentId,
			semester: request.body.semester,
			batch: request.body.batch,
			labBatch: request.body.labBatch
		}
		const data = await getStudentDetails(studentInfo);
		responseHandler(data, request, response);	
	} catch (error: Error | any) {
		const message = 'Failed to retrieve student data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

const studentPositions = router.post('/studentPositions', async (request: Request, response: Response) => {
	try {
		const studentPositions: StudentPositions[] = request.body.studentPositions
		const data = await addStudentPositions(studentPositions)
		responseHandler(data, request, response);	
	} catch (error: Error | any) {
		const message = 'Failed to insert student positions data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

const absentStudents = router.post('/absentStudents', async (request: Request, response: Response) => {
	try {
		const absentStudents: AbsentStudents[] = request.body.absentStudents
		const data = await addAbsentStudents(absentStudents)
		responseHandler(data, request, response)
	} catch (error: Error | any) {
		const message = 'Failed to insert absent students data';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { createRecord, studentPositions, studentDetailsRouter, absentStudents }