import { Container } from 'typedi';
import dotenv from 'dotenv';
dotenv.config();

const serverConfig = (): void => {
  Container.set('port', process.env.PORT);
};

export default serverConfig;
