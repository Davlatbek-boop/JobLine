import { IsEnum, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeekerSkillDto {
  @ApiProperty({
    description: 'Skillning ID raqami',
    example: 1,
    type: Number,
  })
  @IsNumber()
  skill_id: number;

  @ApiProperty({
    description: 'Seeker (ish qidiruvchi) ID raqami',
    example: 42,
    type: Number,
  })
  @IsNumber()
  seeker_id: number;

  @ApiPropertyOptional({
    description: 'Proficiency level (boshlovchi, o‘rtacha yoki yuqori)',
    enum: ['beginner', 'intermediate', 'advanced'],
    example: 'intermediate',
  })
  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  proficiency_level?: 'beginner' | 'intermediate' | 'advanced';

  @ApiPropertyOptional({
    description: 'Skill sertifikatlangan yoki yo‘qligini ko‘rsatadi',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  is_certified?: boolean;
}
