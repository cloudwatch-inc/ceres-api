import { CreateUserAddressRequestDto } from '@module/user/dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserClientRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  bod: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  address: CreateUserAddressRequestDto;
}
