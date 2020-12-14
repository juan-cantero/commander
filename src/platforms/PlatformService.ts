import { Document } from 'mongoose';
import { Service } from 'typedi';
import Platform, { IPlatform } from './PlatformModel';

@Service()
class PlatformService {
  async findPlatformById(id: string): Promise<IPlatform | null> {
    try {
      const platform = await Platform.findById(id);
      return platform;
    } catch (error) {
      throw error;
    }
  }

  async findPlatformByName(name: string): Promise<IPlatform | null> {
    try {
      const platform = await Platform.findOne({ platform: name }).exec();
      return platform;
    } catch (error) {
      throw error;
    }
  }

  async findOrCreatePlatform(name: string): Promise<IPlatform> {
    try {
      const dbPlatform = await this.findPlatformByName(name);
      if (dbPlatform) return dbPlatform;
      const platform = new Platform({ platform: name });
      await Platform.create(platform);
      return platform._id;
    } catch (error) {
      throw error;
    }
  }
}

export default PlatformService;
