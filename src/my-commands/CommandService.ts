import Command from './CommandModel';
import { Document } from 'mongoose';
import { Service } from 'typedi';

@Service()
class CommandService {
  async getAllCommands(): Promise<Document[]> {
    try {
      const commands = await Command.find({});
      return commands;
    } catch (error) {
      throw error;
    }
  }
}

export default CommandService;
