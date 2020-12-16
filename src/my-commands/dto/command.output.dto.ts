import mongoose from 'mongoose';

class CommandOutputDto {
  user!: string | mongoose.ObjectId;
  command!: String;
  description!: String;
  platform!: String | mongoose.ObjectId;
}

export default CommandOutputDto;
