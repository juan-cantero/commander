import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

class CommandInputDto {
  @IsMongoId()
  user!: string;
  @IsString()
  @IsNotEmpty()
  command!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  platform!: string;
}

export default CommandInputDto;
