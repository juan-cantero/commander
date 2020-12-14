import Command, { ICommand } from './CommandModel';
import { Service } from 'typedi';
import CommandCreateDto from './dto/command.create.dto';

@Service()
class CommandService {
  async getAllCommands(): Promise<ICommand[]> {
    try {
      const commands = await Command.find({});
      return commands;
    } catch (error) {
      throw error;
    }
  }

  async getCommand(criteria: { search: string }): Promise<ICommand | null> {
    try {
      const command = await Command.findOne(criteria);
      return command;
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
}

export default CommandService;
