import { UserRole } from '@common/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  userName: string;

  @ApiProperty({ enum: UserRole, nullable: true, required: false })
  @Matches(
    `${Object.values(UserRole)
      .filter((v) => typeof v !== 'number')
      .join('|')}`,
  )
  @IsOptional()
  role?: UserRole;
}
