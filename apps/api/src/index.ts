import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth';

dotenv.config();

const app: Application = express();
const port: string | undefined = process.env.API_PORT;

app.use('/login', authRoute);

app.listen(port, () => console.log(`Server Listening on ${port}`));
