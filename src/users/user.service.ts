import { Inject, Service } from 'typedi';
import Encryption from '../services/Encryption';
import UserCreateDto from './dto/user-create.dto';
import User, { IUser } from './user.model';

@Service()
class UserService {
  @Inject()
  private encryption!: Encryption;
  async findUserById(id: string): Promise<IUser | null> {
    try {
      const foundedUser = await User.findById(id);
      return foundedUser;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkForPasswordMatching(
    dbUserPassword: string,
    loginUserPassword: string
  ): Promise<boolean> {
    return await this.encryption.passwordMatch(
      dbUserPassword,
      loginUserPassword
    );
  }

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
