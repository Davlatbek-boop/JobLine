// src/companies/dto/create-company.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber, IsUrl, IsDecimal, IsDate } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ required: false, example: 2020 })
  @IsOptional()
  @IsNumber()
  founded_year?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certificate?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @ApiProperty({ required: false, example: 4.5 })
  @IsOptional()
  @IsNumber()
  rating?: number;
}
