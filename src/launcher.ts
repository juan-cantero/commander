import { Inject, Service } from 'typedi';
import dbConfig from './config/db.config';
import serverConfig from './config/server.config';
import Database from './db/database';
import ExpressServer from './server';

//config db and server
dbConfig();
serverConfig();

@Service()
class Launcher {
  @Inject()
  private server!: ExpressServer;
  @Inject()
  private database!: Database;

  start() {
    this.database.connect();

    this.server.start(() => {
      this.server.logger.info(`server start on port ${this.server.port}`);
    });
  }
}

export default Launcher;
