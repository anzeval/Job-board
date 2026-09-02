import CustomAPIError from '../../errors/custom-api-error.js';
import User from '../users/user.model.js';
import { createJWT } from './jwt.js';

export const register = async (request, response) => {
  const { name, email, password } = request.body || {};

  if (!name || !email || !password) {
    throw new CustomAPIError('Please provide name, email, and password', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = createJWT(user._id.toString());

  response.status(201).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const login = async (request, response) => {
  const { email, password } = request.body || {};

  if (!email || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new CustomAPIError('Invalid credentials', 401);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomAPIError('Invalid credentials', 401);
  }

  const token = createJWT(user._id.toString());

  response.status(200).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};
