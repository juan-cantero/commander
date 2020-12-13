import 'reflect-metadata';

import Container from 'typedi';
import config from './config';
import Database from './db/database';
import ExpressServer from './server';

config();

const server = Container.get(ExpressServer);
const database = Container.get(Database);

database.connect();

server.start(() => {
  server.logger.info(`server start on port ${server.port}`);
});
