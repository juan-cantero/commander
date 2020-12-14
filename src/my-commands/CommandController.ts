import { Inject, Service } from 'typedi';
import CommandService from './CommandService';
import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import ErrorHandler from '../services/ErrorHandler';
import PlatformService from '../platforms/PlatformService';
import CommandInputDto from './dto/command.input.dto';
import CommandCreateDto from './dto/command.create.dto';

@Service()
class CommandController {
  @Inject()
  private commandService!: CommandService;
  @Inject()
  private platformService!: PlatformService;

  //@describe get all the commands
  //@route GET /api/commands
  //@access PRIVATE
  async getAllCommands(req: Request, res: Response, next: NextFunction) {
    try {
      const commands = await this.commandService.getAllCommands();
      return res.status(200).json({ ok: true, commands: commands });
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }

  //@describe create command
  //@route POST /api/commands
  //@access PRIVATE
  async createCommand(req: Request, res: Response, next: NextFunction) {
    const { user, command, description, platform } = req.body;
    const commandInput = new CommandInputDto();
    commandInput.user = user;
    commandInput.command = command;
    commandInput.description = description;
    commandInput.platform = platform;

    try {
      await validateOrReject(commandInput);
    } catch (error) {
      return ErrorHandler.handleValidationError(error, res);
    }

    try {
      const dbPlatform = await this.platformService.findOrCreatePlatform(
        commandInput.platform
      );
      const commandData = new CommandCreateDto();
      commandData.user = commandInput.user;
      commandData.command = commandInput.command;
      commandData.description = commandInput.description;
      commandData.platform = dbPlatform._id;

      const createdCommand = await this.commandService.createCommand(
        commandData
      );
      res.status(201).json({ ok: true, createdCommand: createdCommand });
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }
}

export default CommandController;
