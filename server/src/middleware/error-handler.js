const errorHandler = (error, _request, response, _next) => {
  let statusCode = error.statusCode || error.status || 500;
  let msg = error.message || 'Internal server error';

  if (error.type === 'entity.parse.failed') {
    statusCode = 400;
    msg = 'Invalid JSON payload';
  }

  if (error.name === 'ValidationError') {
    statusCode = 400;
    msg = 'Invalid input data';
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    msg = 'Invalid ID';
  }

  if (error.code === 11000) {
    statusCode = 409;
    msg = 'Email already exists';
  }

  if (statusCode === 500) {
    msg = 'Internal server error';
  }

  response.status(statusCode).json({ msg });
};

export default errorHandler;
