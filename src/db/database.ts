import mongoose, { ConnectOptions } from 'mongoose';
import { Inject, Service } from 'typedi';
import Logger from '../services/Logger';

const connectionOptions: ConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

@Service()
class Database {
  @Inject()
  private logger!: Logger;
  @Inject('mongoUrl')
  private mongoUrl!: string;

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUrl, connectionOptions);
      this.logger.connectionSuccess('database connected');
    } catch (error) {
      this.logger.error('something bad happened to the db connection');
    }
  }

  async closeConnection() {
    await mongoose.disconnect();
  }
}

export default Database;
