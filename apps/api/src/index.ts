/* eslint-disable import/no-extraneous-dependencies */
import express, { Application } from 'express';
import cors from 'cors';
import supertokens from 'supertokens-node';
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import supertokensInit from './routes/auth';
import env from './helpers/env';
import logger from './helpers/logger/logger.init';
import swaggerOptions from './helpers/swagger/config';
import { userRoute } from './routes/userRouter';

const app: Application = express();
const port: string | undefined = env.apiPort;

supertokensInit();

app.use(
  cors({
    origin: env.websiteDomain,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add the route here
app.use('/users', userRoute);
app.use(errorHandler);

app.listen(port, () => logger.info(`Server Listening on ${port}`));
