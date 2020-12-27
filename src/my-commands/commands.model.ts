import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export declare interface ICommand extends Document {
  user: mongoose.Schema.Types.ObjectId | string;
  command: String;
  description: String;
  platform: mongoose.Schema.Types.ObjectId | string;
  isThereDocumentWithThatNameAndPlatform(
    category: string,
    platform: string
  ): boolean;
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
    },

    platform: {
      type: mongoose.Types.ObjectId,
      ref: 'Platform',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
CommandSchema.index({ user: 1 });
CommandSchema.index({ command: 1, platform: 1 });

CommandSchema.plugin(uniqueValidator);

const Command = mongoose.model<ICommand>('Command', CommandSchema);

export default Command;
