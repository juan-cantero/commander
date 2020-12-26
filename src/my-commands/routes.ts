import express, { Request, Response, NextFunction, request } from 'express';
import Container from 'typedi';

import AuthMiddleWare from '../middlewares/AuthMiddleware';
import CommandController from './commands.controller';

const commandsRoutes: express.IRouter = express.Router();
const commandController = Container.get(CommandController);
const authMiddleware = Container.get(AuthMiddleWare);

commandsRoutes.get(
  '/',
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    commandController.getAllCommands(req, res, next);
  }
);

commandsRoutes.get(
  '/user/:userId',
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    commandController.getCommandsByUser(req, res, next);
  }
);

commandsRoutes.get(
  '/search',
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    commandController.getCommandsByDescription(req, res, next);
  }
);

commandsRoutes.get(
  '/search/platform/:platform',
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    commandController.getCommandsByPlatform(req, res, next);
  }
);

commandsRoutes.post(
  '/',
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    commandController.createCommand(req, res, next);
  }
);

commandsRoutes.delete(
  '/:commandId',
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    commandController.deleteCommand(req, res, next);
  }
);

export default commandsRoutes;
