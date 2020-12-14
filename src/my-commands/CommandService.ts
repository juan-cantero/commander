import Command from './CommandModel';
import { Document } from 'mongoose';
import { Service } from 'typedi';
import CommandDto from './dto/command.dto';

@Service()
class CommandService {
  async getAllCommands(): Promise<any[]> {
    try {
      const commands = await Command.find({});
      return commands;
    } catch (error) {
      throw error;
    }
  }

  async createCommand(commandData: CommandDto): Promise<any> {
    const newCommand = new Command(commandData);
    try {
      return await newCommand.save();
    } catch (error) {
      throw error;
    }
  }
}

export default CommandService;
