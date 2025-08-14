import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateAdminPasswordDto {
  @IsString()
  @Length(6, 30, { message: 'Must be at least 6 characters long' })
  @ApiProperty({
    example: 'currentPass123',
    description: 'Enter your current password',
  })
  oldpassword: string;

  @IsString()
  @Length(6, 100, { message: 'Must be at least 6 characters long' })
  @ApiProperty({
    example: 'NewStrongPass456!',
    description: 'Enter your new password',
  })
  newpassword: string;

  @IsString()
  @Length(6, 100, { message: 'Must be at least 6 characters long' })
  @ApiProperty({
    example: 'NewStrongPass456!',
    description: 'Confirm your new password',
  })
  confirm_password: string;
}
