import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/api', (req: Request, res: Response) => {
  res.status(200).send({
    success: 'true',
    message: 'Welcome to API Node.js, Typescript, PostgreSQL!',
    version: '1.0.0',
  });
});

export default router;