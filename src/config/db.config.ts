import Container from 'typedi';

const dbConfig = () => {
  let mongoUrl;
  if (process.env.NODE_ENV == 'production') {
    mongoUrl = '';
  } else {
    mongoUrl = `mongodb://localhost:27017/commandsdb`;
  }

  Container.set('mongoUrl', mongoUrl);
};

export default dbConfig;
