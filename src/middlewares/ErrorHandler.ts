import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

class ErrorNext extends Error {
  public statusCode!: number;
}

class ErrorHandlerMiddleware {
  handleNotFound(req: Request, res: Response, next: NextFunction): void {
    const error = new Error(`Route not found ${req.originalUrl}`);
    res.status(404);
    next(error);
  }

  handleError(err: ErrorNext, req: Request, res: Response, next: NextFunction) {
    const status: number = err.statusCode || 500;
    const message: string = err.message;

    res.status(status).json({
      message: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  }
}

export default ErrorHandlerMiddleware;
