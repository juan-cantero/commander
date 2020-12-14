import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

class CommandCreateDto {
  @IsMongoId()
  user!: string;
  @IsString()
  @IsNotEmpty({ message: 'no tiene que estar vacio' })
  command!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsMongoId()
  platform!: string;
}

export default CommandCreateDto;
