import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsBoolean,
  IsJSON,
  IsUrl,
  IsObject,
} from "class-validator";
import { Gender, Status, PreferredWorkForm } from "../entities/seeker.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSeekerDto {
  @ApiProperty({ description: "Job seeker name", example: "Olim" })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({ description: "Job seeker surname", example: "Nodirov" })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    description: "Job seeker eamil",
    example: "example@gmail.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password", example: "Passw0rd123!" })
  @IsString()
  password_hash: string;

  @ApiProperty({
    description: "Job seeker phone number",
    example: "+998993330000",
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ description: "Date of birth", example: "2000-02-03" })
  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @ApiProperty({ description: "Gender", example: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ description: "Address", example: "20-01-15" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: "City name", example: "Tashkent" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: "Country name", example: "Chilonzor" })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: "Description", example: "Intelligent, sociable" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Job seeker image link",
    example: "https://example.com/image",
  })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({
    description: "Job seeker social media link unique ID",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  social_links_id?: number;

  @ApiProperty({ description: "languages", example: "en, ru, uz" })
  @IsOptional()
  @IsObject()
  languages?: any;

  @ApiProperty({ description: "Resume file", example: "Resume file" })
  @IsOptional()
  @IsUrl()
  resume_file?: string;

  @ApiProperty({ description: "Expected minimum salary", example: 300 })
  @IsOptional()
  @IsNumber()
  expected_salary_min?: number;

  @ApiProperty({ description: "Expected miximum salary", example: 4000 })
  @IsOptional()
  @IsNumber()
  expected_salary_max?: number;

  @ApiProperty({
    description: "Preferred work format",
    example: PreferredWorkForm.HYBRID,
  })
  @IsOptional()
  @IsEnum(PreferredWorkForm)
  preferred_work_form?: PreferredWorkForm;

  @ApiProperty({
    description: "Preferred location to work",
    example: "Coffee station",
  })
  @IsOptional()
  @IsObject()
  preferred_locations?: any;

  @ApiProperty({
    description: "Job seeker status",
    example: Status.ACTIVE,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({ description: "Is Job seeker at work or not ?", example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
