import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressRequestDto {
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString()
  address_unit?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString()
  address_street?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsString()
  suburb?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  zip: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  photo?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  coverPhoto?: string;
}
