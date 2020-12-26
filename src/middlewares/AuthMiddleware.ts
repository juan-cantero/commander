import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import Container, { Inject, Service } from 'typedi';
import Command from '../my-commands/commands.model';
import ErrorHandler from '../services/ErrorHandler';
import TokenService from '../services/token.service';
import ErrorWithStatus from '../types/errors/ErrorWithStatus';
import { IUser } from '../users/user.model';
import UserService from '../users/user.service';
import ErrorHandlerMiddleware from './ErrorHandler';
@Service()
class AuthMiddleWare {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'not token' });
    }
    let token;

    const tokenWasSendAndStartsWithBearer =
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer');
    if (tokenWasSendAndStartsWithBearer) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded: any = jwt.verify(token, this.tokenService.secretToken);

        const user: IUser | null = await this.userService.findUserById(
          decoded.id
        );

        if (user) {
          req.headers['userid'] = user._id;
        }

        next();
      } catch (error) {
        ErrorHandler.passErrorToHandler(error, next);
      }
    }
  };

  isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['userid'] as string;
    try {
      const user = await this.userService.findUserById(userId);
      if (!user?.isAdmin) {
        const error = new ErrorWithStatus('you do not have admin rights');
        error.statusCode = 401;
        throw error;
      }
      next();
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  };
}

export default AuthMiddleWare;
