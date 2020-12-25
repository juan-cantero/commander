import UserApiCalls from '../api/UserApiCalls';
import { UserCredentials } from './types/UserCredentials';
import { v4 as uuidv4 } from 'uuid';
import UserService from './user.service';
import Container from 'typedi';
import Encryption from '../services/Encryption';
const encryption = Container.get(Encryption);
const userService = new UserService(encryption);

//#########IMPORTANT########
// this test uses the testing database, you can see users in data-testing folder
// don't forget to populate the database before running the tests, to do this you can run "npm run data:populate"
//to change the database you need to change the mongo url in .env file

describe('user controller test suite', () => {
  const adminUser: UserCredentials = {
    email: 'user1@email.com',
    password: '123456',
  };
  const regularUser: UserCredentials = {
    email: 'user2@email.com',
    password: '123456',
  };
  const invalidUser: UserCredentials = {
    email: 'invalid@email.com',
    password: 'invalid',
  };

  it('should login ', async () => {
    const response = await UserApiCalls.login(regularUser);
    expect(response.status).toBe(200);
    expect(response.data.email).toBe(regularUser.email);
  });

  it('should fails with invalid credentials', async () => {
    try {
      const response = await UserApiCalls.login(invalidUser);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toBe('invalid username or password');
    }
  });

  it('should create a new user', async () => {
    const { data } = await UserApiCalls.login(adminUser);
    const token = data.token;
    const response = await UserApiCalls.createUser(
      {
        name: 'juan',
        email: `user${uuidv4()}@email.com`,
        password: '123456',
      },
      token
    );
    expect(response.status).toBe(200);
  });

  it('should throw a validation error when trying to create a user with invalid params', async () => {
    try {
      const { data } = await UserApiCalls.login(adminUser);
      const token = data.token;
      await UserApiCalls.createUser(
        {
          name: '',
          email: `user${uuidv4()}@email`,
          password: '123456',
        },
        token
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual([
        {
          isNotEmpty: 'name should not be empty',
        },
        {
          isEmail: 'email must be an email',
        },
      ]);
    }
  });

  it('should delete the owner user', async () => {
    const { data } = await UserApiCalls.login(regularUser);
    const token = data.token;
    const userIdForDeletion = data._id;
    const response = await UserApiCalls.deleteUserById(
      userIdForDeletion,
      token
    );
    expect(response.status).toBe(200);
  });
});
