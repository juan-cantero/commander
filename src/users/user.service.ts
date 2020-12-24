import { Inject, Service } from 'typedi';
import Encryption from '../services/Encryption';
import UserCreateDto from './dto/user-create.dto';
import User, { IUser } from './user.model';

@Service()
class UserService {
  constructor(private readonly encryption: Encryption) {}
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
    loginUserPassword: string,
    dbUserPassword: string
  ): Promise<boolean> {
    return await this.encryption.passwordMatch(
      loginUserPassword,
      dbUserPassword
    );
  }

  async createUser(userInfo: UserCreateDto): Promise<IUser> {
    try {
      const { name, email, password } = userInfo;
      const userInfoPrepared = {
        name,
        email,
        password: await this.encryption.encryptPassword(password as string),
      };
      const user = new User(userInfoPrepared);
      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(id: string) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
