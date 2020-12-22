import axios from 'axios';
import Container, { Service } from 'typedi';
import serverConfig from '../config/server.config';
import { UserCredentials } from '../types/users/UserCredentials';

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
}

export default UserApiCalls;
