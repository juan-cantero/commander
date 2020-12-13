import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import CommandController from './CommandController';

const commandsRoutes: express.IRouter = express.Router();
const commandController = Container.get(CommandController);

commandsRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  commandController.getAllCommands(req, res, next);
});

export default commandsRoutes;
