import express from 'express';
import { Inject, Service } from 'typedi';
import ErrorHandler from './middlewares/ErrorHandler';
import routes from './routes';
import Logger from './services/Logger';

@Service()
class ExpressServer {
  private _app: express.Application = express();
  @Inject()
  private _errorHandler!: ErrorHandler;
  @Inject('port')
  private _port!: number;
  @Inject()
  public logger!: Logger;

  start(callback: () => void) {
    this._app.use(express.json());
    this._app.use('/api', routes);
    this._app.use(this._errorHandler.handleNotFound);
    this._app.use(this._errorHandler.handleError);
    this._app.listen(this._port, callback);
  }

  get port(): number {
    return this._port;
  }
}

export default ExpressServer;
