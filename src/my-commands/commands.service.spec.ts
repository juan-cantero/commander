import CommandService from './commands.service';
import sinon from 'sinon';
import { instance, when, mock } from 'ts-mockito';

describe('CommandService', () => {
  let mockedCommand: CommandService;
  let command: CommandService;
  beforeEach(() => {
    mockedCommand = mock(CommandService);
    command = instance(mockedCommand);
  });

  describe('getAllTheCommands', () => {
    it('Calls the method getAllCommands', async () => {
      when(mockedCommand.getAllCommands()).thenResolve([
        {
          user: '5fd7709f6e4c1787881f6230',
          command: 'mdd',
          description: 'change dir',
          platform: '5fd7a38d5e34b571caf196e0',
        },
      ]);
      let commands = await command.getAllCommands();

      expect(commands).toMatchObject([
        {
          user: '5fd7709f6e4c1787881f6230',
          command: 'mdd',
          description: 'change dir',
          platform: '5fd7a38d5e34b571caf196e0',
        },
      ]);
    });
  });
});
