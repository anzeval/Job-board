import 'dotenv/config';
import app from './app.js';
import connectToDatabase from './config/database.js';
import CustomAPIError from './errors/custom-api-error.js';
import errorHandler from './middleware/error-handler.js';

const port = process.env.PORT || 5000;

app.use(() => {
  throw new CustomAPIError('Route not found', 404);
});

app.use(errorHandler);

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URL);

    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
