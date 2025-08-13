import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { EducationLevel } from '../entities/education.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({ description: "Specialization unique ID", example: 1 })
  @IsOptional()
  @IsNumber()
  specialization_id?: number;

  @ApiProperty({ description: "Job seeker unique ID", example: 1 })
  @IsNumber()
  seeker_id: number;

  @ApiProperty({ description: "Education level", example: "bachelor" })
  @IsEnum(EducationLevel)
  level: EducationLevel;

  @ApiProperty({ description: "Name", example: "Cambridge" })
  @IsOptional()
  @IsString()
  institution_name?: string;

  @ApiProperty({ description: "Education type", example: "Economy" })
  @IsOptional()
  @IsString()
  faculty?: string;

  @ApiProperty({ description: "Bachelor's degree", example: "bachelor" })
  @IsOptional()
  @IsString()
  degree_name?: string;

  @ApiProperty({
    description: "Education start date",
    example: "2025-06-29",
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiProperty({
    description: "Education end date",
    example: "2025-06-29",
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({
    description: "Education info",
    example: "Deep learning",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
