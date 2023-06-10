/* eslint-disable import/no-extraneous-dependencies */
import express, { Application, json } from 'express';
import cors from 'cors';
import env from './helpers/env';
import logger from './helpers/logger/logger.init';
import { userGet, userPatch } from './routes/userRouter';
import { departmentGet } from './routes/departmentRouter';
import { generalDataGet, testRoute } from './routes/generalDataRouter';
import { experimentRouter } from './routes/experimentRouter';
import { studentRouter } from './routes/studentRouter';
import { createRecord, studentPositions } from './routes/attendanceRouter';
import { createReservation, reviewReservation } from './routes/reservationRouter';
import { notificationViewRoute, notificationDeleteRoute } from './routes/notificationRouter';

const app: Application = express();
const port: string | undefined = env.apiPort;

app.use(
  cors({
    origin: env.websiteDomain,
    allowedHeaders: ['content-type'],
    credentials: true,
  })
);

app.use(json())

// Add the route here
app.use('/', generalDataGet, testRoute)

app.use('/user', userGet, userPatch)

app.use('/department', departmentGet)

app.use('/experiment', experimentRouter)

app.use('/student', studentRouter)

app.use('/attendance', createRecord, studentPositions)

app.use('/reservation', createReservation, reviewReservation)

app.use('/notification', notificationViewRoute, notificationDeleteRoute)

app.listen(port, () => logger.info(`Server Listening on ${port}`));
