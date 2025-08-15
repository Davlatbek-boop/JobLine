import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateSeekerPasswordDto {
  @IsString()
  @Length(6, 30, { message: 'Must be at least 6 characters long' })
  @ApiProperty({
    example: 'Uzbek1st@n',
    description: 'Enter your current password',
  })
  oldpassword: string;

  @IsString()
  @Length(6, 100, { message: 'Must be at least 6 characters long' })
  @ApiProperty({
    example: 'Uzbek1st@n',
    description: 'Enter your new password',
  })
  newpassword: string;


  @IsString()
  @Length(6, 100, { message: 'Must be at least 6 characters long' })
  @ApiProperty({
    example: 'Uzbek1st@n',
    description: 'Confirm your new password',
  })
  confirm_password: string;
}
