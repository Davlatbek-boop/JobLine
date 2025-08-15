import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsBoolean,
  IsUrl,
  IsObject,
} from 'class-validator';
import { Gender, Status, PreferredWorkForm } from '../entities/seeker.entity';

export class CreateSeekerDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the job seeker',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the job seeker',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the job seeker',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Uzbek1st@n',
    description: 'Password of the job seeker',
  })
  @IsString()
  password_hash: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the job seeker',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({
    example: '1995-08-14',
    description: 'Birth date in YYYY-MM-DD format',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @ApiProperty({
    description: 'Gender of the job seeker',
    enum: Gender,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    example: '123 Main Street',
    description: 'Street address',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'Tashkent',
    description: 'City name',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'Uzbekistan',
    description: 'Country name',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    example: 'Experienced web developer',
    description: 'Brief description or bio',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Profile image URL',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({
    example: 1,
    description: 'ID linking to seeker’s social links',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  social_links_id?: number;

  @ApiProperty({
    example: { English: 'Fluent', Russian: 'Intermediate' },
    description: 'Languages and proficiency levels',
    required: false,
  })
  @IsOptional()
  @IsObject()
  languages?: any;

  @ApiProperty({
    example: 'https://example.com/resume.pdf',
    description: 'Resume file URL',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  resume_file?: string;

  @ApiProperty({
    example: 500,
    description: 'Minimum expected salary',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  expected_salary_min?: number;

  @ApiProperty({
    example: 1000,
    description: 'Maximum expected salary',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  expected_salary_max?: number;

  @ApiProperty({
    description: 'Preferred work format',
    enum: PreferredWorkForm,
    required: false,
  })
  @IsOptional()
  @IsEnum(PreferredWorkForm)
  preferred_work_form?: PreferredWorkForm;

  @ApiProperty({
    example: { country: 'Uzbekistan', city: 'Tashkent' },
    description: 'Preferred job locations',
    required: false,
  })
  @IsOptional()
  @IsObject()
  preferred_locations?: any;

  @ApiProperty({
    description: 'Current status of the job seeker',
    enum: Status,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
