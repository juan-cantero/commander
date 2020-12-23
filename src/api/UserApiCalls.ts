import axios from 'axios';
import Container, { Service } from 'typedi';
import serverConfig from '../config/server.config';
import UserCreateDto from '../users/dto/user-create.dto';
import { UserCredentials } from '../users/types/UserCredentials';

serverConfig();
const port = Container.get('port');

const userApiCall = axios.create({
  baseURL: `http://192.168.0.104:${port}/api/users`,
});

@Service()
class UserApiCalls {
  static async login(userCredentials: UserCredentials) {
    return await userApiCall.post('/login', userCredentials);
  }

  static async createUser(userInfo: UserCreateDto, token: string) {
    const formatedToken = token.trim();

    return await userApiCall.post('/', userInfo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${formatedToken}`,
      },
    });
  }
}

export default UserApiCalls;
