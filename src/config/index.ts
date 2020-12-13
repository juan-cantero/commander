import dbConfig from './db.config';
import serverConfig from './server.config';

const config = (): void => {
  serverConfig();
  dbConfig();
};

export default config;
