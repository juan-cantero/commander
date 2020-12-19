import Container from 'typedi';
import dotenv from 'dotenv';

dotenv.config();

const jwtConfig = (): void => {
  Container.set('jwt', 'a');
};

export default jwtConfig;
