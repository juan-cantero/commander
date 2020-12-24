import mongoose from 'mongoose';
import Container from 'typedi';
import { InMemoryDb } from '../db/InMemoryDb';
import Encryption from '../services/Encryption';
import Logger from '../services/Logger';
import UserService from '../users/user.service';
import Command from './commands.model';
import CommandService from './commands.service';

const encryption = Container.get(Encryption);
const logger = Container.get(Logger);

describe('user service test suite', () => {
  let commandService = new CommandService();
  const database: InMemoryDb = new InMemoryDb(logger);

  beforeAll(async () => {
    await database.connect();
    Command.collection.insertMany([
      {
        user: mongoose.Types.ObjectId('5fe4b47ca656c4b3f2b35b9b'),
        description: 'list files',
        command: 'ls',
        platform: 'linux',
      },
      {
        user: mongoose.Types.ObjectId('5fe4b47ca656c4b3f2b35b9b'),
        description: 'network statistics',
        command: 'netstat',
        platform: 'linux',
      },
      {
        user: mongoose.Types.ObjectId(),
        description: 'list directories',
        command: 'dir',
        platform: 'windows',
      },
    ]);
  });

  afterAll(async () => {
    await Command.collection.drop();
    await database.closeConnection();
  });

  it('should get all the commands for a user', async () => {
    const commands = await commandService.getCommandsByUserId(
      '5fe4b47ca656c4b3f2b35b9b'
    );
    expect(commands[0].command).toBe('ls');
    expect(commands.length).toBe(2);
  });
});
