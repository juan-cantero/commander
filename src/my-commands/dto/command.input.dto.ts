import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

class CommandInputDto {
  @IsMongoId()
  user!: string;
  @IsString()
  @IsNotEmpty({ message: 'no tiene que estar vacio' })
  command!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  platform!: string;
}

export default CommandInputDto;
