import express from 'express';
import { Inject, Service } from 'typedi';
import AuthMiddleWare from './middlewares/AuthMiddleware';
import ErrorHandlerMiddleware from './middlewares/ErrorHandler';
import routes from './routes';
import Logger from './services/Logger';

@Service()
class ExpressServer {
  private _app: express.Application = express();
  @Inject()
  private _authMiddleware!: AuthMiddleWare;
  @Inject()
  private _errorHandler!: ErrorHandlerMiddleware;
  @Inject('port')
  private _port!: number;
  @Inject()
  public logger!: Logger;

  start(callback: () => void) {
    this._app.use(express.json());
    this._app.use('/api', routes);
    this._app.use(this._authMiddleware.verifyToken);
    this._app.use(this._errorHandler.handleNotFound);
    this._app.use(this._errorHandler.handleError);
    this._app.listen(this._port, callback);
  }

  get app() {
    return this._app;
  }

  get port(): number {
    return this._port;
  }
}

export default ExpressServer;
