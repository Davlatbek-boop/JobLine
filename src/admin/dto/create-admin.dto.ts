import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsBooleanString,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'ali123' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'ali@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    nullable: true,
    description: 'Faqat "true" yoki "false" bo‘lishi mumkin',
  })
  @IsNotEmpty()
  @IsBooleanString()
  is_creator: string;

  @ApiProperty({
    example: 'false',
    description: 'Faqat "true" yoki "false" bo‘lishi mumkin',
  })
  @IsNotEmpty()
  @IsBooleanString()
  is_active: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;
}
