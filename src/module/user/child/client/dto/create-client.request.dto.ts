import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientRequestDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsDateString()
  bod: Date;

  @IsOptional()
  @IsString()
  address_unit?: string;

  @IsOptional()
  @IsString()
  address_street?: string;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  suburb?: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  zip: string;

  @IsString()
  country: string;

  @IsOptional()
  photo?: string;

  @IsString()
  coverPhoto?: string;
}
