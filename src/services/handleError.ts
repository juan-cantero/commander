import { NextFunction } from 'express';

const passErrorToHandler = (error: Error, next: NextFunction): void => {
  next(error);
};

export default passErrorToHandler;
