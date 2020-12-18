import express from 'express';
import commandsRoutes from '../my-commands/routes';
import userRoutes from '../users/routes';

const routes = express.Router();

routes.use('/commands', commandsRoutes);
routes.use('/users', userRoutes);

export default routes;
