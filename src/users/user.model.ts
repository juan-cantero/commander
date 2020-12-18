import mongoose, { Document } from 'mongoose';

export declare interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  isAdmin: Boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
