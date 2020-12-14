import Command from './CommandModel';
import { Service } from 'typedi';
import CommandCreateDto from './dto/command.create.dto';

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

  async createCommand(commandData: CommandCreateDto): Promise<any> {
    const newCommand = new Command(commandData);
    try {
      return await newCommand.save();
    } catch (error) {
      throw error;
    }
  }
}

export default CommandService;
