import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Seeker } from "../../seekers/entities/seeker.entity";
import { Specialization } from "../../specialization/entities/specialization.entity";
import { ApiProperty } from "@nestjs/swagger";

export enum EducationLevel {
  HIGH_SCHOOL = "high_school",
  BACHELOR = "bachelor",
  MASTER = "master",
  DOCTORATE = "doctorate",
  OTHER = "other",
}

@Entity("education")
export class Education {
  @ApiProperty({ description: "Education unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Specialization unique ID", example: 1 })
  @Column({ type: "bigint", nullable: true })
  specialization_id: number;

  @ApiProperty({ description: "Job seeker unique ID", example: 1 })
  @Column({ type: "bigint",nullable:true })
  seeker_id: number;

  @ApiProperty({ description: "Education level", example: "bachelor" })
  @Column({ type: "enum", enum: EducationLevel })
  level: EducationLevel;

  @ApiProperty({ description: "Name", example: "Cambridge" })
  @Column({ type: "varchar", nullable: true })
  institution_name: string;

  @ApiProperty({ description: "Education type", example: "Economy" })
  @Column({ type: "varchar", nullable: true })
  faculty: string;

  @ApiProperty({ description: "Bachelor's degree", example: "bachelor" })
  @Column({ type: "varchar", nullable: true })
  degree_name: string;

  @ApiProperty({
    description: "Education start date",
    example: "2025-06-29",
  })
  @Column({ type: "date", nullable: true })
  start_date: string;

  @ApiProperty({
    description: "Education end date",
    example: "2025-06-29",
  })
  @Column({ type: "date", nullable: true })
  end_date: string;

  @ApiProperty({
    description: "Education info",
    example: "Deep learning",
  })
  @Column({ type: "text", nullable: true })
  description: string;

  @ApiProperty({
    description: "Education created date",
    example: "2025-06-29",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Education last changed date",
    example: "2025-06-29",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    type: () => Seeker,
    description: "Seeker info",
    example: "1",
  })
  @ManyToOne(() => Seeker, (seeker) => seeker.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seeker_id" })
  seeker: Seeker;

  @ApiProperty({
    type: () => Specialization,
    description: "Seeker info",
    example: "1",
  })
  @ManyToOne(
    () => Specialization,
    (specialization) => specialization.education,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "specialization_id" })
  specialization: Specialization;
}
