import { UserRole } from '@common/enum';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  userName: string;

  @Matches(
    `${Object.values(UserRole)
      .filter((v) => typeof v !== 'number')
      .join('|')}`,
  )
  @IsOptional()
  role?: UserRole;
}
