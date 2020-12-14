import { Inject, Service } from 'typedi';
import CommandService from './CommandService';
import { Request, Response, NextFunction } from 'express';
import passErrorToHandler from '../services/handleError';

@Service()
class CommandController {
  @Inject()
  private commandService!: CommandService;

  //@describe get all the commands
  //@route GET /api/commands
  //@access PRIVATE
  async getAllCommands(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const commands = await this.commandService.getAllCommands();
      return res.status(200).json(commands);
    } catch (error) {
      passErrorToHandler(error, next);
    }
  }
}

export default CommandController;
