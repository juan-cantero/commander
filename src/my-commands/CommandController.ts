import { Inject, Service } from 'typedi';
import CommandService from './CommandService';
import { Request, Response, NextFunction } from 'express';

@Service()
class CommandController {
  @Inject()
  private commandService!: CommandService;

  async getAllCommands(req: Request, res: Response, next: NextFunction) {
    try {
      const commands = await this.commandService.getAllCommands();
      res.status(200).json(commands);
    } catch (error) {
      throw error;
    }
  }
}

export default CommandController;
