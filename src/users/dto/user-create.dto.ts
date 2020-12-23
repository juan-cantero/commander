import { IsEmail, IsNotEmpty } from 'class-validator';

class UserCreateDto {
  @IsNotEmpty()
  name!: String;
  @IsEmail()
  email!: String;
  password!: String;
}

export default UserCreateDto;
