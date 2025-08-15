import { ApiProperty } from "@nestjs/swagger";
import { Vacancy } from "../../vacancies/entities/vacancy.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "../../skills/entities/skill.entity";

export enum ProficiencyLevelType {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export enum PriorityType {
  MUST_HAVE = "must_have",
  NICE_TO_HAVE = "nice_to_have",
}

@Entity("vacancy_skills")
export class VacancySkill {
  @ApiProperty({ description: "Vacancy skill unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Is this skill required ?", example: true })
  @Column({ nullable: true })
  isRequired: boolean;

  @ApiProperty({
    description: "Proficiency level",
    example: "intermediate",
  })
  @Column({
    type: "enum",
    enum: ProficiencyLevelType,
    default: ProficiencyLevelType.INTERMEDIATE,
    nullable: true,
  })
  proficiencyLevel?: ProficiencyLevelType;

  @ApiProperty({
    description: "Proficiency level",
    example: "must_have",
  })
  @Column({
    type: "enum",
    enum: PriorityType,
    default: PriorityType.MUST_HAVE,
    nullable: true,
  })
  priority?: PriorityType;

  // ==========================
  @ApiProperty({
    type: () => Vacancy,
    description: "Vacancy info",
    example: "1",
  })
  @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacancySkills)
  vacancy: Vacancy;

  @ApiProperty({
    type: () => Skill,
    description: "Skill info",
    example: "1",
  })
  @ManyToOne(() => Skill, (skill) => skill.vacancySkills)
  skill: Skill;
}
