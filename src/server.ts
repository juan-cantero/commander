import express from 'express';
import { Inject, Service } from 'typedi';
import routes from './routes';
import Logger from './services/Logger';

@Service()
class ExpressServer {
  private _app: express.Application = express();
  @Inject('port')
  private _port!: number;
  @Inject()
  public logger!: Logger;

  start(callback: () => void) {
    this._app.use(express.json());
    this._app.use('/api', routes);
    this._app.listen(this._port, callback);
  }

  get port() {
    return this._port;
  }
}

export default ExpressServer;
