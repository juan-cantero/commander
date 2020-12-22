import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Service } from 'typedi';
import Logger from '../services/Logger';
import { connectionOptions } from './config';
import { IDatabase } from './IDatabase';

@Service()
export class InMemoryDb implements IDatabase {
  private readonly mongod = new MongoMemoryServer();

  constructor(private readonly logger: Logger) {}

  async connect(): Promise<void> {
    try {
      const uri = await this.mongod.getUri();
      const port = await this.mongod.getPort();
      mongoose.connect(uri, connectionOptions);
      this.logger.connectionSuccessInTesting(
        `[test]database connected on port ${port}`
      );
    } catch (error) {
      console.log(error);
      this.logger.errorInTesting(
        '[test]somemething went wrong with the connection'
      );
    }
  }
  async closeConnection(): Promise<void> {
    try {
      await mongoose.disconnect();
      await this.mongod.stop();
      this.logger.infoInTesting('[test]connection closed');
    } catch (error) {
      this.logger.errorInTesting(
        '[test]something went wrong trying to disconnect'
      );
    }
  }
}
