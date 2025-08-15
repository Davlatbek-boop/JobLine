import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'salimovdavlat0526@gmail.com',
    description: 'Foydalanuvchining elektron pochta manzili',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Uzbek1st@n',
    description: 'Foydalanuvchining paroli',
  })
  @IsString()
  password: string;
}
