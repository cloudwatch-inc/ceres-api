import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
