import jwt from 'jsonwebtoken';
import CustomAPIError from '../../errors/custom-api-error.js';

const authenticateUser = (request, _response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CustomAPIError('Authentication invalid', 401);
  }

  const token = authorization.split(' ')[1];

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new CustomAPIError('Authentication invalid', 401);
  }

  if (!payload.userId) {
    throw new CustomAPIError('Authentication invalid', 401);
  }

  request.user = { userId: payload.userId };
  next();
};

export default authenticateUser;
