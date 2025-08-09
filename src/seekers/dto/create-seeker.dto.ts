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
} from 'class-validator';
import { Gender, Status, PreferredWorkForm } from '../entities/seeker.entity';

export class CreateSeekerDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsEmail()
  email: string;

  @IsString()
  password_hash: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  img_url?: string;

  @IsOptional()
  @IsNumber()
  social_links_id?: number;

  @IsOptional()
  @IsObject()
  languages?: any;

  @IsOptional()
  @IsUrl()
  resume_file?: string;

  @IsOptional()
  @IsNumber()
  expected_salary_min?: number;

  @IsOptional()
  @IsNumber()
  expected_salary_max?: number;

  @IsOptional()
  @IsEnum(PreferredWorkForm)
  preferred_work_form?: PreferredWorkForm;

  @IsOptional()
  @IsObject()
  preferred_locations?: any;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
