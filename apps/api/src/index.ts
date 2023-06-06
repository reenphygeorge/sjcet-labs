/* eslint-disable import/no-extraneous-dependencies */
import express, { Application } from 'express';
import cors from 'cors';
import env from './helpers/env';
import logger from './helpers/logger/logger.init';
import { userGet, userPatch } from './routes/userRouter';

const app: Application = express();
const port: string | undefined = env.apiPort;

app.use(
  cors({
    origin: env.websiteDomain,
    allowedHeaders: ['content-type'],
    credentials: true,
  })
);

// Add the route here
app.use('/user', userGet, userPatch);

app.listen(port, () => logger.info(`Server Listening on ${port}`));
