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
  async getAllCommands(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const commands = await this.commandService.getAllCommands();
      return res.status(200).json(commands);
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }

  //@describe create command
  //@route POST /api/commands
  //@access PRIVATE
  async createCommand(req: Request, res: Response, next: NextFunction) {
    const { user, command, description, platform } = req.body;
    const commandDto = new CommandInputDto();
    commandDto.user = user;
    commandDto.command = command;
    commandDto.description = description;
    commandDto.platform = platform;

    try {
      await validateOrReject(commandDto);
    } catch (error) {
      return ErrorHandler.handleValidationError(error, res);
    }

    try {
      let createdPlatform;
      let dbPlatform = await this.platformService.findPlatformByName(
        commandDto.platform
      );
      if (!dbPlatform) {
        createdPlatform = await this.platformService.createPlatform(
          commandDto.platform
        );
      }
      const commandData = new CommandCreateDto();
      commandData.user = commandDto.user;
      commandData.command = commandDto.command;
      commandData.description = commandDto.description;
      commandData.platform =
        dbPlatform !== null ? dbPlatform._id : createdPlatform._id;
      const createdCommand = await this.commandService.createCommand(
        commandData
      );
      res.json(createdCommand);
    } catch (error) {
      ErrorHandler.passErrorToHandler(error, next);
    }
  }
}

export default CommandController;
