import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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

const Platform = mongoose.model('Platform', PlatformSchema);

export default Platform;
