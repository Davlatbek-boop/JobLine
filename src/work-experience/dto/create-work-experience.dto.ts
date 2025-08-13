import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsBoolean,
} from "class-validator";
import { EmploymentType } from "../entities/work-experience.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWorkExperienceDto {
  @ApiProperty({ description: "Company name", example: "Samsung" })
  @IsOptional()
  @IsString()
  company_name?: string;

  @ApiProperty({ description: "Position", example: "CEO" })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ description: "Specialization unique ID", example: 2 })
  @IsOptional()
  @IsNumber()
  specialization_id?: number;

  @ApiProperty({ description: "Job seeker unique ID", example: 2 })
  @IsNumber()
  seeker_id: number;

  @ApiProperty({
    description: "Employment type",
    example: EmploymentType.FULL_TIME,
  })
  @IsEnum(EmploymentType)
  employment_type: EmploymentType;

  @ApiProperty({
    description: "Start date to work",
    example: "2025-01-29",
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiProperty({
    description: "Start date to work",
    example: "2025-02-28",
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({
    description: "Is it current work place",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  is_current?: boolean;

  @ApiProperty({
    description: "Salary to work",
    example: 450,
  })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({
    description: "United Stated Dollar",
    example: "USD",
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({
    description: "Extra info about work experience",
    example:
      "Good place to work but I want find new one to gain more experience",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Achievements at work",
    example: "International work experience",
  })
  @IsOptional()
  @IsString()
  achievements?: string;
}
