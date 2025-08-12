import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Specialization } from "../../specialization/entities/specialization.entity";

export enum SkillType {
  TECHNICAL = "Technical",
  SOFT = "Soft",
  OTHER = "Other",
  LANGUAGE = "Language",
  CERTIFICATION = "Certification",
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "enum", enum: SkillType })
  skill_type: SkillType;

  @Column({ default: true })
  is_active: boolean;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  
  @ManyToOne(() => Specialization, (specialization) => specialization.skill, {
    onDelete: "CASCADE",
  })
  specialization: Specialization;
}
