import Container from 'typedi';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = () => {
  let mongoUrl;

  if (process.env.MONGO_URI) {
    mongoUrl = process.env.MONGO_URI;
  } else if (process.env.NODE_ENV == 'production') {
    mongoUrl = process.env.MONGO_URI_PROD;
  } else {
    mongoUrl = process.env.MONGO_URI_DEV;
  }

  Container.set('mongoUrl', mongoUrl);
};

export default dbConfig;
