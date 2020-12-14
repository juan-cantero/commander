import { Service } from 'typedi';
import Platform from './PlatformModel';

@Service()
class PlatformService {
  async findPlatformById(id: string) {
    try {
      const platform = await Platform.findById(id);
      return platform;
    } catch (error) {
      throw error;
    }
  }

  async findPlatformByName(name: string) {
    try {
      const platform = await Platform.findOne({ platform: name }).exec();
      return platform;
    } catch (error) {
      throw error;
    }
  }

  async createPlatform(name: string) {
    try {
      const platform = new Platform({ platform: name });
      await Platform.create(platform);
      return platform._id;
    } catch (error) {
      throw error;
    }
  }
}

export default PlatformService;
