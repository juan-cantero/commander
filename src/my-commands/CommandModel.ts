import mongoose from 'mongoose';

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
  { timestamps: true }
);

const Command = mongoose.model('Command', CommandSchema);

export default Command;
