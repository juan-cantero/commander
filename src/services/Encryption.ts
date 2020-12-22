import { Service } from 'typedi';
import bcrypt from 'bcrypt';

@Service({ global: true })
class Encryption {
  async encryptPassword(plainPassword: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const encryptedPass = await bcrypt.hash(plainPassword, salt);
      return encryptedPass;
    } catch (error) {
      throw error;
    }
  }

  async passwordMatch(password1: string, password2: string): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
  }
}

export default Encryption;
