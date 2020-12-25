import Container from 'typedi';
import dbConfig from '../config/db.config';
import Database from '../db/database';
import Logger from '../services/Logger';
import User from '../users/user.model';
import { usersData } from './users';

dbConfig();
const logger = Container.get(Logger);
const mongoUrl = Container.get('mongoUrl') as string;
const db = new Database(logger, mongoUrl);
export class UserSeeder {
  static async connectToDatabase(): Promise<void> {
    try {
      await db.connect();
    } catch (error) {
      logger.error(error);
      process.exit();
    }
  }

  static async disconnect() {
    try {
      await db.closeConnection();
    } catch (error) {
      logger.error(error);
    }
  }

  static async populateDatabase(): Promise<void> {
    try {
      await UserSeeder.destroyData();
      await User.insertMany(usersData);
      logger.info('database poupulated');
      process.exit();
    } catch (error) {
      logger.error(error);
      process.exit();
    }
  }

  static async destroyData(): Promise<void> {
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

UserSeeder.connectToDatabase();

if (process.argv[2] === '-d') {
  UserSeeder.destroyData();
} else {
  UserSeeder.populateDatabase();
}
