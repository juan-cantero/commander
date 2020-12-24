import { Inject } from 'typedi';
import CommandService from './commands.service';
import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import ErrorHandler from '../services/ErrorHandler';
import PlatformService from '../platforms/PlatformService';
import CommandInputDto from './dto/command.input.dto';
import CommandCreateDto from './dto/command.create.dto';

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

  //@describe get commands by user
  //@route GET /api/commands/user/:userId
  //@access PRIVATE
  async getCommandsByUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    try {
      const commands = await this.commandService.getCommandsByUserId(userId);
      res.status(200).json(commands);
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }

  //@describe get all the commands that match description
  //@route GET /api/commands/search/description/:description?platfrom
  //@access PRIVATE
  async getCommandsByDescription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const description = req.params.description;
      const platform: string = req.query.platform as string;
      const commands = await this.commandService.getCommandsByDescription(
        description,
        platform
      );
      res.status(200).json({ ok: true, commands });
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }

  //@describe get all the commands that match platform
  //@route GET /api/commands/search/platform/:platform
  //@access PRIVATE
  async getCommandsByPlatform(req: Request, res: Response, next: NextFunction) {
    try {
      const keyword = req.params.platform as string;
      const commands = await this.commandService.getCommandByPlatform(keyword);
      res.status(200).json({ ok: true, commands });
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

  //@describe create command
  //@route Delete /api/commands/:commandId
  //@access PRIVATE
  async deleteCommand(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['userid'] as string;
    const { commandId } = req.params;
    try {
      await this.commandService.deleteCommand(commandId, userId);
      res.status(200).json({ ok: true, message: 'command deleted' });
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }
}

export default CommandController;
