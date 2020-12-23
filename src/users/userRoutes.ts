import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import AuthMiddleWare from '../middlewares/AuthMiddleware';
import UserController from './user.controller';

const userRoutes: express.IRouter = express.Router();
const userController = Container.get(UserController);
const authMiddleware = Container.get(AuthMiddleWare);

userRoutes.post(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res, next);
  }
);

userRoutes.post('/login', (req: Request, res: Response, next: NextFunction) => {
  userController.authUser(req, res, next);
});

export default userRoutes;
