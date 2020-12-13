import express from 'express';
import commandsRoutes from '../my-commands/routes';

const routes = express.Router();

routes.use('/commands', commandsRoutes);

export default routes;
