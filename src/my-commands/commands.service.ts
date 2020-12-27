import Command, { ICommand } from './commands.model';
import { Inject, Service } from 'typedi';
import CommandCreateDto from './dto/command.create.dto';
import { RegexQuery } from './command.types';
import CommandOutputDto from './dto/command.output.dto';
import PlatformService from '../platforms/PlatformService';
import ErrorWithStatus from '../types/errors/ErrorWithStatus';
import { CommandSearchDto } from './dto/command.search.dto';

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
      const commands = await Command.find({ user: userId }).populate(
        'platform',
        'platform -_id'
      );

      return commands;
    } catch (error) {
      throw error;
    }
  }

  async searchCommands(
    userId: string,
    search: CommandSearchDto
  ): Promise<ICommand[] | null> {
    let query: RegexQuery = {
      description: { $regex: search.description, $options: 'i' },
    };
    let commands;

    try {
      if (search.platform) {
        const platformDb = await this._platformService.findPlatformByName(
          search.platform
        );
        commands = await Command.find({ ...query })
          .and([{ user: userId }, { platform: platformDb?._id }])
          .populate({ path: 'platform', select: 'platform -_id' });
      } else {
        commands = await Command.find({ ...query })
          .and([{ user: userId }])
          .populate({
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

  async findCommandByUserNameAndPlatform(
    user: string,
    name: string,
    platform: string
  ) {
    try {
      const command = await Command.findOne({
        user: user,
        command: name,
        platform: platform,
      });
      return command;
    } catch (error) {
      throw error;
    }
  }

  async isThereCommandWithThatNameAndPlatform(
    userId: string,
    name: string,
    platform: string
  ) {
    try {
      const command = await this.findCommandByUserNameAndPlatform(
        userId,
        name,
        platform
      );
      const doc = await Command.findOne({ _id: command?._id });
      if (doc) return true;
      else return false;
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
      await command?.deleteOne();
    } catch (error) {
      throw error;
    }
  }
}

export default CommandService;
