import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Specialization } from "../../specialization/entities/specialization.entity";
import { VacancySkill } from "../../vacancy_skills/entities/vacancy_skill.entity";
import { ApiProperty } from "@nestjs/swagger";

export enum SkillType {
  TECHNICAL = "Technical",
  SOFT = "Soft",
  OTHER = "Other",
  LANGUAGE = "Language",
  CERTIFICATION = "Certification",
}

@Entity()
export class Skill {
  @ApiProperty({
    description: "Unique Skill ID",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "JavaScript",
    description: "Name of the skill",
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    example: "Main programming language for frontend development",
    description: "Short description of the skill",
    required: false,
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    example: SkillType.SOFT,
    description: "Type of the skill (e.g., HARD or SOFT)",
    enum: SkillType,
  })
  @Column({ type: "enum", enum: SkillType })
  skill_type: SkillType;

  @ApiProperty({
    example: true,
    description: "Indicates whether the skill is active or not",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Skill changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ApiProperty({
    description: "Skill created date",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty({
    type: () => Specialization,
    description: "Specialization info",
    example: "1",
  })
  @ManyToOne(() => Specialization, (specialization) => specialization.skill, {
    onDelete: "CASCADE",
  })
  specialization: Specialization;

  @ApiProperty({
    type: () => [VacancySkill],
    description: 'Required Skill of Vacancies',
  })
  @OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.skill, {
    onDelete: "CASCADE",
  })
  vacancySkills: VacancySkill[];
}
