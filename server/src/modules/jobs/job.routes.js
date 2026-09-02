import express from 'express';
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from './job.controller.js';

const router = express.Router();

router.get('/', getAllJobs);
router.post('/', createJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
