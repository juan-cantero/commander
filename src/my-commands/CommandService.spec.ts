import CommandService from './CommandService';

import { instance, when, mock } from 'ts-mockito';
import mongoose from 'mongoose';

describe('CommandService', () => {
  let mockedCommand: CommandService;
  let command: CommandService;
  beforeEach(() => {
    mockedCommand = mock(CommandService);
    command = instance(mockedCommand);
  });

  describe('getAllTheCommands', () => {
    it('Calls the method getAllCommands', async () => {
      when(mockedCommand.getAllCommands()).thenResolve([{ command: 'ls -f' }]);
      let commands = await command.getAllCommands();
      expect(commands).toMatchObject([{ command: 'ls -f' }]);
    });
  });
});
