import sinon from 'sinon';

import { instance, when, mock } from 'ts-mockito';
import CommandController from './commands.controller';

describe('CommandController', () => {
  let mockedCommand: CommandController;
  let command: CommandController;
  beforeEach(() => {
    mockedCommand = mock(CommandController);
    command = instance(mockedCommand);
  });

  describe('getAllTheComands', () => {
    it('it should return all the commands', async () => {
      command.getAllCommands = jest.fn();
    });
  });

  describe('getCommandById', () => {});
});
