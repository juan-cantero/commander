import UserApiCalls from '../api/UserApiCalls';
import { UserCredentials } from '../types/users/UserCredentials';

describe('user controller test suite', () => {
  const validUser: UserCredentials = {
    email: 'juan2@email.com',
    password: '123456',
  };
  const invalidUser: UserCredentials = {
    email: 'invalid@email.com',
    password: 'invalid',
  };
  it('should login ', async () => {
    const response = await UserApiCalls.login(validUser);

    expect(response.status).toBe(200);
    expect(response.data.email).toBe(validUser.email);
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
});
