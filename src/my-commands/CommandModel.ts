import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export declare interface ICommand extends Document {
  user: mongoose.Schema.Types.ObjectId;
  command: String;
  description: String;
  platform: mongoose.Schema.Types.ObjectId;
}

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

const Command = mongoose.model<ICommand>('Command', CommandSchema);

export default Command;
