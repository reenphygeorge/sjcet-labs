import express, { Application } from 'express';
import cors from 'cors';
import supertokens from 'supertokens-node';
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import supertokensInit from './routes/auth';
import env from './helpers/env';

// import authRoute from './routes/auth';

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

// app.use('/login', authRoute);

app.use(errorHandler());

app.listen(port, () => console.log(`Server Listening on ${port}`));
