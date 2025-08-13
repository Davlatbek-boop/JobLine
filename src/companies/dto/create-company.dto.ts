// src/companies/dto/create-company.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUrl,
  IsDecimal,
  IsDate,
} from "class-validator";

export class CreateCompanyDto {
  @ApiProperty({ description: "Company name", example: "Apple" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Company email", example: "example@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Company phon number",
    example: "+998991112233",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: "Online company service or site",
    example: "company.com",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: "Online company service or site",
    example: "company.com",
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Company address",
    example: "Uzbekistan Tashkent",
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: "Company info",
    example: "Come and find job",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Industry",
    example: "American Car Industry",
    required: false,
  })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({
    description: "Company founded year",
    required: false,
    example: 2020,
  })
  @IsOptional()
  @IsNumber()
  founded_year?: number;

  @ApiProperty({
    description: "Company photo or company logo",
    example: "https://Cherolet.png",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({
    description: "Company certificate",
    example: "https://Cheroletcertificate.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  certificate?: string;

  @ApiProperty({
    description: "Defined",
    example: "true",
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @ApiProperty({
    description: "Company rating",
    required: false,
    example: 4.5,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;
}
