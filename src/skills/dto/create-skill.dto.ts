import { SkillType } from "../entities/skill.entity";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillDto {
  @ApiProperty({
    example: "JavaScript",
    description: "Name of the skill",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Main programming language for frontend development",
    description: "Short description of the skill",
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 3,
    description: "Specialization ID to which this skill belongs",
  })
  @IsNotEmpty()
  @IsNumber()
  specialization_id: number;

  @ApiProperty({
    example: SkillType.SOFT,
    description: "Type of the skill (e.g., HARD or SOFT)",
    enum: SkillType,
  })
  @IsEnum(SkillType)
  skill_type: SkillType;

  @ApiProperty({
    example: true,
    description: "Indicates whether the skill is active or not",
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
