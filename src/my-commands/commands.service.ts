import Command, { ICommand } from './commands.model';
import { Inject, Service } from 'typedi';
import CommandCreateDto from './dto/command.create.dto';
import { RegexQuery } from './command.types';
import CommandOutputDto from './dto/command.output.dto';
import PlatformService from '../platforms/PlatformService';
import commandsRoutes from './routes';
import ErrorWithStatus from '../types/errors/ErrorWithStatus';

@Service()
class CommandService {
  @Inject()
  private _platformService!: PlatformService;

  async getAllCommands(): Promise<CommandOutputDto[]> {
    try {
      const commands = await Command.find({})
        //.populate({ path: 'user', select: 'user -_id' })
        .populate('platform', 'platform -_id');

      return commands;
    } catch (error) {
      throw error;
    }
  }

  async getCommandsByUserId(userId: string): Promise<CommandOutputDto[]> {
    try {
      const commands = await Command.find({ user: userId });
      return commands;
    } catch (error) {
      throw error;
    }
  }

  async getCommandsByDescription(
    description: string,
    platform?: string
  ): Promise<ICommand[] | null> {
    let query: RegexQuery = {
      description: { $regex: description, $options: 'i' },
    };
    let commands;

    try {
      if (platform) {
        const platformDb = await this._platformService.findPlatformByName(
          platform
        );
        commands = await Command.find({ ...query })
          .and([{ platform: platformDb?._id }])
          .populate({ path: 'platform', select: 'platform -_id' });
      } else {
        commands = await Command.find({ ...query }).populate({
          path: 'platform',
          select: 'platform -_id',
        });
      }

      return commands;
    } catch (error) {
      throw error;
    }
  }

  async getCommandByPlatform(platform: string) {
    try {
      const platformDb = await this._platformService.findPlatformByName(
        platform
      );
      const commands = await Command.find({
        platform: platformDb?._id,
      }).populate({ path: 'platform', select: 'platform -_id' });
      return commands;
    } catch (error) {
      throw error;
    }
  }

  async createCommand(commandData: CommandCreateDto): Promise<ICommand> {
    const newCommand = new Command(commandData);
    try {
      return await newCommand.save();
    } catch (error) {
      throw error;
    }
  }

  async deleteCommand(commandId: string, loggedUserId: string) {
    try {
      const command = await Command.findById(commandId);
      const ownerId = command?.user.toString();
      if (ownerId && ownerId.localeCompare(loggedUserId) !== 0) {
        const error = new ErrorWithStatus(
          'can not delete, you are not the owner'
        );
        error.statusCode = 401;
        throw error;
      }
      await command?.save();
    } catch (error) {
      throw error;
    }
  }
}

export default CommandService;
