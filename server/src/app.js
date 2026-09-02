import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import authenticateUser from './modules/auth/auth.middleware.js';
import authRouter from './modules/auth/auth.routes.js';
import jobsRouter from './modules/jobs/job.routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

export default app;
