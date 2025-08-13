import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateSeekerSkillDto {

  @ApiProperty({ description: "Skill ID", example: 1 })
  @IsNumber()
  skill_id: number;

  @ApiProperty({ description: "Job Seeker ID", example: 1 })
  @IsNumber()
  seeker_id: number;

  @ApiProperty({ description: "Proficiency level", example: "intermediate" })
  @IsOptional()
  @IsEnum(["beginner", "intermediate", "advanced"])
  proficiency_level?: "beginner" | "intermediate" | "advanced";


  @ApiProperty({ description: "Has he or she certificate", example: true })
  @IsOptional()
  @IsBoolean()
  is_certified?: boolean;
}
