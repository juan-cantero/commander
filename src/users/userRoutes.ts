import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserController from './user.controller';

const userRoutes: express.IRouter = express.Router();
const userController = Container.get(UserController);

userRoutes.post('/', (req: Request, res: Response, next: NextFunction) => {
  userController.createUser(req, res, next);
});

userRoutes.post('/login', (req: Request, res: Response, next: NextFunction) => {
  userController.authUser(req, res, next);
});

export default userRoutes;
