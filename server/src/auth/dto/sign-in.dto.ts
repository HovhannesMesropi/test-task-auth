import { IsString, IsEmail, MaxLength } from 'class-validator';

export class SignInUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  password: string;
}
