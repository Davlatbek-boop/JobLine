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
} from 'class-validator';

export class CreateHrDto {
  @ApiProperty({ description: "Hr name", example: "Zokir" })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  first_name: string;

  @ApiProperty({ description: "Hr surname", example: "Bohodirov" })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @ApiProperty({ description: "Hr eamil", example: "example@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password", example: "Passw0rd123!" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "Hr phone number", example: "+998900099889" })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: "Phone number must be in format +998xxxxxxxxx",
  })
  phone_number: string;

  @ApiProperty({ description: "Hr position", example: "main" })
  @IsString()
  @MaxLength(100)
  position: string;

  @ApiProperty({ description: "Branch name", example: "Chilonzor" })
  @IsString()
  @MaxLength(100)
  department: string;

  @ApiProperty({ description: "About Hr", example: "Colm" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Hr image link",
    example: "https://example.com/image",
  })
  @IsOptional()
  @IsUrl()
  img_url?: string;

  @ApiProperty({ description: "Hr Company unique ID", example: 2 })
  @IsInt()
  company_id: number;

  @ApiProperty({ description: "Hr role", example: true })
  @IsBoolean()
  role: boolean;

  @ApiProperty({ description: "Is Hr at work or not ?", example: true })
  @IsBoolean()
  is_active: boolean;
}
