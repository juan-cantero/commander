import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserController from './user.controller';

const userRoutes: express.IRouter = express.Router();
const commandController = Container.get(UserController);

export default userRoutes;
