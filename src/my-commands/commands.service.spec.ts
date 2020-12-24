import mongoose from 'mongoose';
import Container from 'typedi';
import { InMemoryDb } from '../db/InMemoryDb';
import PlatformService from '../platforms/PlatformService';
import Logger from '../services/Logger';
import Command from './commands.model';
import CommandService from './commands.service';
import CommandCreateDto from './dto/command.create.dto';

const logger = Container.get(Logger);

describe('command service test suite', () => {
  let commandService = new CommandService();
  let platformService = new PlatformService();
  const database: InMemoryDb = new InMemoryDb(logger);

  beforeAll(async () => {
    await database.connect();
  });

  beforeEach(async () => {
    await Command.collection.insertMany([
      {
        user: mongoose.Types.ObjectId('5fe4b47ca656c4b3f2b35b9b'),
        description: 'list files',
        command: 'ls',
        platform: mongoose.Types.ObjectId(),
      },
      {
        user: mongoose.Types.ObjectId('5fe4b47ca656c4b3f2b35b9b'),
        description: 'network statistics',
        command: 'netstat',
        platform: mongoose.Types.ObjectId(),
      },
      {
        user: mongoose.Types.ObjectId(),
        description: 'list directories',
        command: 'dir',
        platform: mongoose.Types.ObjectId('5fe4baf52922d96a163286fe'),
      },
    ]);
  });

  afterEach(async () => {
    await Command.collection.drop();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  it('should create a command', async () => {
    const input = {
      user: '5fe4b47ca656c4b3f2b35b9b',
      command: 'npm install',
      description: 'install package',
      platform: 'node',
    };
    const dbPlatform = await platformService.findOrCreatePlatform(
      input.platform
    );
    const commandData = new CommandCreateDto();
    commandData.user = input.user;
    commandData.command = input.command;
    commandData.description = input.description;
    commandData.platform = dbPlatform._id;
    const command = await commandService.createCommand(commandData);
    expect(command.command).toBe('npm install');
  });
  it('should get all the commands', async () => {
    const commands = await commandService.getAllCommands();
    expect(commands.length).toBe(3);
  });
  it('should get all the commands for a user', async () => {
    const commands = await commandService.getCommandsByUserId(
      '5fe4b47ca656c4b3f2b35b9b'
    );
    expect(commands[0].command).toBe('ls');
    expect(commands.length).toBe(2);
  });
});
