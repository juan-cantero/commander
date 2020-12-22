import UserService from './user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User, { IUser } from './user.model';
import mongoose from 'mongoose';
import Container from 'typedi';
import Encryption from '../services/Encryption';

const encryption = Container.get(Encryption);

describe('user service test suite', () => {
  let userService: UserService = new UserService(encryption);
  const mongod = new MongoMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    User.collection.insertMany([
      { name: 'user1', email: 'user1@email.com', password: '123' },
      { name: 'user2', email: 'user2', password: '123' },
    ]);
  });

  afterAll(async () => {
    await User.collection.drop();
    await mongoose.disconnect();
    await mongod.stop();
  });

  const createdUser = {
    name: 'juan',
    email: 'juan@perez.com',
    password: '123456',
  };
  it('should create a user', async () => {
    const user: IUser = await userService.createUser(createdUser);
    const { email } = user;
    expect(email).toEqual('juan@perez.com');
  });

  it('should get an user by id', async () => {
    const userDb = await userService.findUserByEmail('user1@email.com');
    const id = userDb?._id;
    const findedUser = await userService.findUserById(id);
    expect(id).not.toBeFalsy();
    expect(findedUser?.email).toBe('user1@email.com');
  });

  it('should compare an user password from db against an user password passed', async () => {
    const user: IUser = await userService.createUser({
      name: 'juan',
      email: 'juan@email.com',
      password: '1234',
    });
    const passwordMatch = await userService.checkForPasswordMatching(
      '1234',
      user.password as string
    );

    expect(passwordMatch).toBe(true);
  });
});
