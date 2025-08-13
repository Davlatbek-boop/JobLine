import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeekerSocialLinkDto {
  @ApiProperty({
    description: 'Social link turi ID raqami (masalan, LinkedIn, GitHub va boshqalar)',
    example: 1,
    type: Number,
  })
  @IsNumber()
  social_link_id: number;

  @ApiProperty({
    description: 'Seeker (ish qidiruvchi) ID raqami',
    example: 42,
    type: Number,
  })
  @IsNumber()
  seeker_id: number;

  @ApiProperty({
    description: 'Foydalanuvchining ijtimoiy tarmoq havolasi',
    example: 'https://linkedin.com/in/johndoe',
    type: String,
  })
  @IsString()
  link: string;
}
