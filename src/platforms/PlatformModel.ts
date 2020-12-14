import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export declare interface IPlatform extends Document {
  platform: String;
}

const PlatformSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

PlatformSchema.plugin(uniqueValidator);

const Platform = mongoose.model<IPlatform>('Platform', PlatformSchema);

export default Platform;
