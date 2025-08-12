import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { EducationLevel } from '../entities/education.entity';

export class CreateEducationDto {
  @IsOptional()
  @IsNumber()
  specialization_id?: number;

  @IsNumber()
  seeker_id: number;

  @IsEnum(EducationLevel)
  level: EducationLevel;

  @IsOptional()
  @IsString()
  institution_name?: string;

  @IsOptional()
  @IsString()
  faculty?: string;

  @IsOptional()
  @IsString()
  degree_name?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
