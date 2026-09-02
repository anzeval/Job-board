import mongoose from 'mongoose';

const connectToDatabase = async (url) => {
  if (!url) {
    throw new Error('MONGODB_URL is not defined');
  }

  await mongoose.connect(url);

  return mongoose.connection;
};

export default connectToDatabase;
