import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  userName: string;

  @IsNotEmpty()
  password: string;
}
