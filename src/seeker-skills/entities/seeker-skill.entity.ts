import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from "typeorm";
import { Seeker } from "../../seekers/entities/seeker.entity";
import { Skill } from "../../skills/entities/skill.entity";
import { ApiProperty } from "@nestjs/swagger";
// import { Skill } from './skill.entity';

@Entity("seeker_skills")
@Index(["seeker", "skill"], { unique: true })
export class SeekerSkill {
  @ApiProperty({ description: "SeekerSkill unique ID" })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ description: "Skill ID", example: 1 })
  @Column({ type: "bigint" })
  skill_id: number;

  @ApiProperty({ description: "Job Seeker ID", example: 1 })
  @Column({ type: "bigint" })
  seeker_id: number;

  @ApiProperty({ description: "Proficiency level", example: "intermediate" })
  @Column({
    type: "enum",
    enum: ["beginner", "intermediate", "advanced"],
    nullable: true,
  })
  proficiency_level: "beginner" | "intermediate" | "advanced";

  @ApiProperty({ description: "Has he or she certificate", example: true })
  @Column({ type: "boolean", nullable: true })
  is_certified: boolean;

  @ApiProperty({
    description: "A day when job seeker apply for this company",
    example: "2025-06-29",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    type: () => Seeker,
    description: "Seeker info",
    example: "1",
  })
  @ManyToOne(() => Seeker, (seeker) => seeker.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seeker_id" })
  seeker: Seeker;

  @ApiProperty({
    type: () => Skill,
    description: "Skill info",
    example: "1",
  })
  @ManyToOne(() => Skill, (skill) => skill.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "skill_id" })
  skill: Skill;
}
