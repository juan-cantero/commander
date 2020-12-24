import Container from 'typedi';
import dbConfig from '../config/db.config';
import Database from '../db/database';
import Logger from '../services/Logger';
import User from '../users/user.model';
import { usersData } from './users';

dbConfig();
const logger = Container.get(Logger);
const mongoUrl = Container.get('mongoUrl') as string;
export class UserSeeder {
  private db = new Database(logger, mongoUrl);
  async connectToDatabase(): Promise<void> {
    try {
      await this.db.connect();
    } catch (error) {
      logger.error(error);
      process.exit();
    }
  }

  async disconnect() {
    try {
      await this.db.closeConnection();
    } catch (error) {
      logger.error(error);
    }
  }

  async populateDatabase(): Promise<void> {
    try {
      await this.destroyData();
      await User.insertMany(usersData);
      logger.info('database poupulated');
      process.exit();
    } catch (error) {
      logger.error(error);
      process.exit();
    }
  }

  async destroyData(): Promise<void> {
    try {
      await User.deleteMany({});
      logger.info('data destroyed');
    } catch (error) {
      logger.error('could not destroy data');
      process.exit();
    }
  }

  async getUsersIds(): Promise<string[]> {
    const users = await User.find({});
    const userIds = users.map(user => user._id);
    return userIds;
  }
}

const userSeeder = new UserSeeder();

userSeeder.connectToDatabase();

if (process.argv[2] === '-d') {
  userSeeder.destroyData();
} else {
  userSeeder.populateDatabase();
}
