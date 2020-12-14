import CommandService from './CommandService';
import { instance, when, mock } from 'ts-mockito';

describe('CommandService', () => {
  let mockedCommand: CommandService;
  beforeEach(() => {
    mockedCommand = mock(CommandService);
  });

  describe('getAllTheCommands', () => {
    it('Calls the method getAllCommands', async () => {
      when(mockedCommand.getAllCommands()).thenResolve([{ command: 'ls -f' }]);
      let command = instance(mockedCommand);
      let commands = await command.getAllCommands();
      expect(commands).toMatchObject([{ command: 'ls -f' }]);
    });
  });
});
