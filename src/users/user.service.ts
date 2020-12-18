import { Service } from 'typedi';
import User, { IUser } from './user.model';

@Service()
class UserService {
  async createUser(userInfo: UserCreateDto): Promise<IUser> {
    try {
      const user = new User(userInfo);
      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
