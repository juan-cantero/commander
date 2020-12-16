import mongoose, { Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export declare interface ICommand extends Document {
  user: mongoose.Schema.Types.ObjectId | string;
  command: String;
  description: String;
  platform: mongoose.Schema.Types.ObjectId | string;
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

CommandSchema.virtual('platformNames', {
  ref: 'Platform',
  localField: 'platform',
  foreignField: 'platform',
});

CommandSchema.plugin(uniqueValidator);

const Command = mongoose.model<ICommand>('Command', CommandSchema);

export default Command;
