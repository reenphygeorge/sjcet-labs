/* eslint-disable import/no-extraneous-dependencies */
import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import env from './helpers/env';
import logger from './helpers/logger/logger.init';
import swaggerOptions from './helpers/swagger/config';
import { userRoute } from './routes/userRouter';

const app: Application = express();
const port: string | undefined = env.apiPort;

app.use(
  cors({
    origin: env.websiteDomain,
    allowedHeaders: ['content-type'],
    credentials: true,
  }),
);

app.use(express.json())

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add the route here
// app.use('/users', userRoute);

app.use('/user', userRoute)

app.listen(port, () => logger.info(`Server Listening on ${port}`));
