import { Container } from 'typedi';

const serverConfig = (): void => {
  if (process.env.PORT) {
    Container.set('port', process.env.PORT);
    return;
  }

  let port: number;
  if (process.env.NODE_ENV == 'production') {
    port = 6000;
  } else {
    port = 5000;
  }

  Container.set('port', port);
};

export default serverConfig;
