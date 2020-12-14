import { ObjectId } from 'mongoose';

class CommandDto {
  user!: string;
  command!: string;
  description!: string;
  platform!: string;
}

export default CommandDto;
