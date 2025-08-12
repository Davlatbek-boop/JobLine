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
} from 'class-validator';

export class CreateHrDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: 'Phone number must be in format +998xxxxxxxxx',
  })
  phone_number: string;

  @IsString()
  @MaxLength(100)
  position: string;

  @IsString()
  @MaxLength(100)
  department: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  img_url?: string;

  @IsInt()
  company_id: number;

  @IsBoolean()
  role: boolean;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsBoolean()
  is_active: boolean;
}
