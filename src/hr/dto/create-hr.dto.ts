import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsInt,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class CreateHrDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the HR staff member (2–50 characters)',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the HR staff member (2–50 characters)',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Unique email address of the HR staff member',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Uzbek1st@n',
    description: 'Password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
      example: 'Uzbek1st@n',
      description: 'Password confirmation',
    })
    @IsNotEmpty({ message: 'Password confirmation is required' })
    @IsString()
    confirm_password: string;
  

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number in Uzbekistan format, must match +998xxxxxxxxx',
  })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: 'Phone number must be in format +998xxxxxxxxx',
  })
  phone_number: string;

  @ApiProperty({
    example: 'HR Manager',
    description: 'Position or job title (max 100 characters)',
  })
  @IsString()
  @MaxLength(100)
  position: string;

  @ApiProperty({
    example: 'Human Resources',
    description: 'Department name (max 100 characters)',
  })
  @IsString()
  @MaxLength(100)
  department: string;

  @ApiProperty({
    example: 'Responsible for recruitment and onboarding processes',
    description: 'Brief description of the HR staff member',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/uploads/profile.jpg',
    description: 'Profile image URL',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({
    example: 5,
    description: 'ID of the company the HR staff belongs to',
  })
  @IsInt()
  companyId: number;

  @ApiProperty({
    example: false,
    description: 'Indicates if the HR staff member has admin privileges',
  })
  @IsString()
  role: string;


  @ApiProperty({
    example: false,
    description: 'Indicates if the HR staff is currently active',
  })
  @IsBoolean()
  is_active: boolean;
}
