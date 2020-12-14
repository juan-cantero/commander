import { NextFunction, Response } from 'express';

class ErrorHandler {
  static passErrorToHandler(error: Error, next: NextFunction): void {
    next(error);
  }
  static handleValidationError(error: Error, res: Response): Response {
    return res.status(400).json(error);
  }
}

export default ErrorHandler;
