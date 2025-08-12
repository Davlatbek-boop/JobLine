import { IsEnum, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateSeekerSkillDto {
  @IsNumber()
  skill_id: number;

  @IsNumber()
  seeker_id: number;

  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  proficiency_level?: 'beginner' | 'intermediate' | 'advanced';

  @IsOptional()
  @IsBoolean()
  is_certified?: boolean;
}
