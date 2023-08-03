import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import {
  recordCreate,
  addStudentPositions,
  getStudentDetails,
  addAbsentStudents,
} from '../services/attendanceService';
import { AttendanceInfo } from '../helpers/types/user';

const router = express.Router();

const createRecord = router.post('/create', async (request: Request, response: Response) => {
  try {
    const attendanceInfo: AttendanceInfo = {
      courseCode: request.body.courseCode,
      experimentIds: request.body.experimentIds,
      labId: request.body.labId,
      periods: request.body.periods,
    };
    const data = await recordCreate(attendanceInfo);
    responseHandler(data, request, response);
  } catch (error: Error | any) {
    const message = 'Failed to create attendance record';
    error.message = message;
    errorHandler(error, request, response);
  }
});

const studentDetailsRouter = router.get(
  '/studentDetails',
  async (request: Request, response: Response) => {
    try {
      const studentInfo: any = request.query;
      const data = await getStudentDetails(studentInfo);
      responseHandler(data, request, response);
    } catch (error: Error | any) {
      const message = 'Failed to retrieve student data';
      error.message = message;
      errorHandler(error, request, response);
    }
  }
);

const studentPositions = router.post(
  '/studentPositions',
  async (request: Request, response: Response) => {
    try {
      const { studentsPositions } = request.body;
      const data = await addStudentPositions(studentsPositions);
      responseHandler(data, request, response);
    } catch (error: Error | any) {
      const message = 'Failed to insert student positions data';
      error.message = message;
      errorHandler(error, request, response);
    }
  }
);

const absentStudents = router.post(
  '/absentStudents',
  async (request: Request, response: Response) => {
    try {
      const { absentStudentsInfo } = request.body;
      const data = await addAbsentStudents(absentStudentsInfo);
      responseHandler(data, request, response);
    } catch (error: Error | any) {
      const message = 'Failed to insert absent students data';
      error.message = message;
      errorHandler(error, request, response);
    }
  }
);

export { createRecord, studentPositions, studentDetailsRouter, absentStudents };
