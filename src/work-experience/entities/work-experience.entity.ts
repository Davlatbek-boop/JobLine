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

export enum EmploymentType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
  FREELANCE = "freelance",
  OTHER = "other",
}

@Entity("work_experience")
export class WorkExperience {
  @ApiProperty({ description: "Work experience unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Company name", example: "Samsung" })
  @Column({ type: "varchar", nullable: true })
  company_name: string;

  @ApiProperty({ description: "Position", example: "CEO" })
  @Column({ type: "varchar", nullable: true })
  position: string;

  @ApiProperty({ description: "Specialization unique ID", example: 2 })
  @Column({ type: "bigint", nullable: true })
  specialization_id: number;

  @ApiProperty({ description: "Job seeker unique ID", example: 2 })
  @Column({ type: "bigint" })
  seeker_id: number;

  @ApiProperty({
    description: "Employment type",
    example: EmploymentType.FULL_TIME,
  })
  @Column({ type: "enum", enum: EmploymentType })
  employment_type: EmploymentType;

  @ApiProperty({
    description: "Start date to work",
    example: "2025-02-29",
  })
  @Column({ type: "date", nullable: true })
  start_date: string;

  @ApiProperty({
    description: "Start date to work",
    example: "2025-02-29",
  })
  @Column({ type: "date", nullable: true })
  end_date: string;

  @ApiProperty({
    description: "Is it current work place",
    example: false,
  })
  @Column({ type: "boolean", default: false })
  is_current: boolean;

  @ApiProperty({
    description: "Salary to work",
    example: 450,
  })
  @Column({ type: "bigint", nullable: true })
  salary: number;

  @ApiProperty({
    description: "United Stated Dollar",
    example: "USD",
  })
  @Column({ type: "varchar", length: 3, nullable: true })
  currency: string;

  @ApiProperty({
    description: "Extra info about work experience",
    example:
      "Good place to work but I want find new one to gain more experience",
  })
  @Column({ type: "text", nullable: true })
  description: string;

  @ApiProperty({
    description: "Achievements at work",
    example: "International work experience",
  })
  @Column({ type: "text", nullable: true })
  achievements: string;

  @ApiProperty({
    description: "Work Experience added date",
    example: "2025-02-29T10:30:00Z",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Work Experience last changed date",
    example: "2025-02-29T10:30:00Z",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
      type: () => Seeker,
      description: 'Seeker info',
      example: '1',
    })
  @ManyToOne(() => Seeker, (seeker) => seeker.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seeker_id" })
  seeker: Seeker;

  @ApiProperty({
      type: () => Specialization,
      description: 'Specialization info',
      example: '1',
    })
  @ManyToOne(() => Specialization, (specialization) => specialization.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "specialization_id" })
  specialization: Specialization;
}
