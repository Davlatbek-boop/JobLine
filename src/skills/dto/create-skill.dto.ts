import { SkillType } from "../entities/skill.entity";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from "class-validator";

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  specialization_id: number;
  @IsEnum(SkillType)
  skill_type: SkillType;
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
