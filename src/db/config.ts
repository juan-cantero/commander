import { ConnectOptions } from 'mongoose';

export const connectionOptions: ConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
