import { ApiProperty } from "@nestjs/swagger";
import { Vacancy } from "../../vacancies/entities/vacancy.entity";
import {
  PriorityType,
  ProficiencyLevelType,
} from "../entities/vacancy_skill.entity";
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { Skill } from "../../skills/entities/skill.entity";

export class CreateVacancySkillDto {
  @ApiProperty({ description: "Is this skill required ?", example: true })
  @IsNotEmpty()
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({
    description: "Proficiency level",
    example: ProficiencyLevelType.INTERMEDIATE,
    enum: ProficiencyLevelType,
  })
  @IsOptional()
  @IsEnum(ProficiencyLevelType)
  proficiencyLevel?: ProficiencyLevelType;

  @ApiProperty({
    description: "Proficiency level",
    example: PriorityType.NICE_TO_HAVE,
    enum: PriorityType,
  })
  @IsOptional()
  @IsEnum(PriorityType)
  priority?: PriorityType;

  // ==========================
  @ApiProperty({
    description: "Vacancy info",
    example: "1",
  })
  @IsNotEmpty()
  @IsInt()
  vacancy: Vacancy;

  @ApiProperty({
    description: "Skill info",
    example: "1",
  })
  @IsNotEmpty()
  @IsInt()
  skill: Skill;
}
