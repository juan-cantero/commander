import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Container, { Inject, Service } from 'typedi';
import ErrorHandler from '../services/ErrorHandler';
import TokenService from '../services/token.service';
import User, { IUser } from '../users/user.model';
import UserService from '../users/user.service';

const tokenService = Container.get(TokenService);
const userService = Container.get(UserService);

@Service()
class AuthMiddleWare {
  //private userService = userService;

  async verifyToken(req: Request, res: Response, next: NextFunction) {
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
        const decoded: any = jwt.verify(token, tokenService.secretToken);

        const user: IUser | null = await userService.findUserById(decoded.id);

        if (user) {
          req.headers['userid'] = user._id;
        }

        next();
      } catch (error) {
        ErrorHandler.passErrorToHandler(error, next);
      }
    }
  }
}

export default AuthMiddleWare;
