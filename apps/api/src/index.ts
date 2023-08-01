/* eslint-disable import/no-extraneous-dependencies */
import express, { Application, json } from 'express';
import cors from 'cors';
import env from './helpers/env';
import logger from './helpers/logger/logger.init';
import { userGet, userPatch } from './routes/userRouter';
import { generalDataGet, testRoute } from './routes/generalDataRouter';
import { experimentRouter } from './routes/experimentRouter';
import {
  createRecord,
  studentPositions,
  studentDetailsRouter,
  absentStudents,
} from './routes/attendanceRouter';
import {
  createReservation,
  reviewReservation,
  deleteReservation,
} from './routes/reservationRouter';
import { notificationViewRoute, notificationDeleteRoute } from './routes/notificationRouter';
import { getLog } from './routes/logRouter';
import { reportCreateRouter, reportDeleteRouter, reportReviewRouter } from './routes/reportRouter';
import { availableLabs, labReservations } from './routes/freeLabsRouter';

const app: Application = express();
const port: string | undefined = env.apiPort;

app.use(
  cors({
    origin: env.websiteDomain,
    allowedHeaders: ['content-type'],
    credentials: true,
  })
);

app.use(json());

// Add the route here
app.use('/', generalDataGet, testRoute);

app.use('/user', userGet, userPatch);

app.use('/experiment', experimentRouter);

app.use('/attendance', createRecord, studentDetailsRouter, studentPositions, absentStudents);

app.use('/reservation', createReservation, reviewReservation, deleteReservation);

app.use('/notification', notificationViewRoute, notificationDeleteRoute);

app.use('/logs', getLog);

app.use('/report', reportCreateRouter, reportReviewRouter, reportDeleteRouter);

app.use('/labs', labReservations, availableLabs);

app.listen(port, () => logger.info(`Server Listening on ${port}`));
