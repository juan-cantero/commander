import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CommandSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    description: {
      type: String,
      required: true,
    },

    command: {
      type: String,
      required: true,
      unique: true,
    },

    platform: {
      type: mongoose.Types.ObjectId,
      ref: 'Platform',
    },
  },
  { timestamps: true }
);

CommandSchema.plugin(uniqueValidator);

const Command = mongoose.model('Command', CommandSchema);

export default Command;
