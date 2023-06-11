import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { createReport, deleteReports, reviewReport } from '../services/reportService';
import { ReportData } from '../helpers/types/user';

const router = express.Router()

const reportCreateRouter = router.post('/create', async (request: Request, response: Response) => {
	try {
		const reportData: ReportData = {
			labId: request.body.labId,
			professorId: request.body.professorId,
			systems: request.body.systems,
			issueDescription: request.body.issueDescription
		}
		const data = await createReport(reportData)
		responseHandler(data, request, response);
	} catch (error: Error | any) {
		const message = 'Failed to create report';
		error.message = message;
		errorHandler(error, request, response);
	}
})

const reportReviewRouter = router.patch('/review', async (request: Request, response: Response) => {
	try {
		const reviewIds: string[] = request.body.reviewIds
		const data = await reviewReport(reviewIds)
		responseHandler(data, request, response);
	} catch (error: Error | any) {
		const message = 'Failed to review report';
		error.message = message;
		errorHandler(error, request, response);
	}
})

const reportDeleteRouter = router.delete('/delete', async (request: Request, response: Response) => {
	try {
		const reportIds: string[] = request.body.reportIds
		const data = await deleteReports(reportIds)
		responseHandler(data, request, response);
	} catch (error: Error | any) {
		const message = 'Failed to delete report';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { reportCreateRouter, reportReviewRouter, reportDeleteRouter }