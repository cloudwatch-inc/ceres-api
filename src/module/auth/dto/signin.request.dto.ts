import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SigninRequestDto {
  @ApiProperty({ nullable: true, required: false })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({ nullable: true, required: false })
  @IsNotEmpty()
  @IsOptional()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
