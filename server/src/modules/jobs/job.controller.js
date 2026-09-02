import CustomAPIError from '../../errors/custom-api-error.js';
import Job from './job.model.js';

export const getAllJobs = async (request, response) => {
  const { status, jobType, sort, search, page, limit } = request.query;

  const queryObject = {
    createdBy: request.user.userId,
  };

  if (['pending', 'interview', 'declined'].includes(status)) {
    queryObject.status = status;
  }

  if (['full-time', 'part-time', 'remote'].includes(jobType)) {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = {
      $regex: search,
      $options: 'i',
    };
  }

  const sortOptions = {
    latest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };
  const sortOption = sortOptions[sort] || sortOptions.latest;

  const currentPage = Math.max(Number(page) || 1, 1);
  const pageLimit = Math.max(Number(limit) || 10, 1);
  const skip = (currentPage - 1) * pageLimit;

  const jobs = await Job.find(queryObject)
    .sort(sortOption)
    .skip(skip)
    .limit(pageLimit);
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / pageLimit);

  response.status(200).json({
    jobs,
    totalJobs,
    numOfPages,
  });
};

export const createJob = async (request, response) => {
  const { company, position, status, jobType, jobLocation } =
    request.body || {};

  const job = await Job.create({
    company,
    position,
    status,
    jobType,
    jobLocation,
    createdBy: request.user.userId,
  });

  response.status(201).json({ job });
};

export const updateJob = async (request, response) => {
  const job = await Job.findById(request.params.id);

  if (!job) {
    throw new CustomAPIError('Job not found', 404);
  }

  if (job.createdBy.toString() !== request.user.userId) {
    throw new CustomAPIError('Not authorized to update this job', 403);
  }

  const allowedFields = [
    'company',
    'position',
    'status',
    'jobType',
    'jobLocation',
  ];
  const updates = request.body || {};
  let hasUpdates = false;

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      job[field] = updates[field];
      hasUpdates = true;
    }
  }

  if (!hasUpdates) {
    throw new CustomAPIError('No valid fields to update', 400);
  }

  await job.save();

  response.status(200).json({ job });
};

export const deleteJob = async (request, response) => {
  const job = await Job.findById(request.params.id);

  if (!job) {
    throw new CustomAPIError('Job not found', 404);
  }

  if (job.createdBy.toString() !== request.user.userId) {
    throw new CustomAPIError('Not authorized to delete this job', 403);
  }

  await job.deleteOne();

  response.status(200).json({ msg: 'Job deleted successfully' });
};
