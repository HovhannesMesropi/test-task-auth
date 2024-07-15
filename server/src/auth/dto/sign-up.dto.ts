import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  password: string;
}
