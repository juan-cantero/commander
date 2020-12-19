import 'reflect-metadata';

import Container from 'typedi';
import dbConfig from './config/db.config';
import serverConfig from './config/server.config';
import Database from './db/database';
import ExpressServer from './server';

//config db and server
dbConfig();
serverConfig();

const server = Container.get(ExpressServer);
const database = Container.get(Database);

database.connect();

server.start(() => {
  server.logger.info(`server start on port ${server.port}`);
});
