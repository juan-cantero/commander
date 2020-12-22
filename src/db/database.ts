import mongoose from 'mongoose';
import { Inject, Service } from 'typedi';
import Logger from '../services/Logger';
import { connectionOptions } from './config';
import { IDatabase } from './IDatabase';

@Service()
class Database implements IDatabase {
  @Inject('mongoUrl')
  private mongoUrl!: string;

  constructor(private logger: Logger, url?: string) {
    if (url) this.mongoUrl = url;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUrl, connectionOptions);
      this.logger.connectionSuccess('database connected');
    } catch (error) {
      this.logger.error('something bad happened to the db connection');
    }
  }

  async closeConnection() {
    try {
      await mongoose.disconnect();
      this.logger.connectionSuccess('database disconnected');
    } catch (error) {
      this.logger.error('something bad happened to the db connection');
    }
  }
}

export default Database;
