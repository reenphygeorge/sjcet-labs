import express, { Request, Response } from 'express';
import login from '../services/auth';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(login());
});

export default router;
