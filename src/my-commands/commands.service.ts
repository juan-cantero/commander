import Command, { ICommand } from './commands.model';
import { Inject, Service } from 'typedi';
import CommandCreateDto from './dto/command.create.dto';
import { RegexQuery } from './command.types';
import CommandOutputDto from './dto/command.output.dto';
import PlatformService from '../platforms/PlatformService';

@Service()
class CommandService {
  @Inject()
  private _platformService!: PlatformService;

  async getAllCommands(): Promise<CommandOutputDto[]> {
    try {
      const commands = await Command.find({}).populate(
        'platform',
        'platform -_id'
      );

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

  async deleteCommand(commandId: string) {
    try {
      await Command.findByIdAndDelete(commandId);
    } catch (error) {
      throw error;
    }
  }
}

export default CommandService;
