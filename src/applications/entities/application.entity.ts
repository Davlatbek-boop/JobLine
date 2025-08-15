import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Vacancy } from "../../vacancies/entities/vacancy.entity";
import { Seeker } from "../../seekers/entities/seeker.entity";

export enum ApplicationStatusType {
  PENDING = "pending",
  REVIEWED = "reviewed",
  SHORTLISTED = "shortlisted",
  INTERVIEW_SCHEDULED = "interview_scheduled",
  INTERVIEWED = "interviewed",
  TECHNICAL_TEST = "technical_test",
  REFERENCE_CHECK = "reference_check",
  OFFERED = "offered",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
  EXPIRED = "expired",
}

@Entity("applications")
export class Application {
  @ApiProperty({ description: "Application unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Cover letter", example: "Cover letter" })
  @Column({ type: "text", nullable: true })
  cover_letter?: string;

  @ApiProperty({ description: "Resume file", example: "Resume file" })
  @Column({
    nullable: true,
  })
  resume_file?: string;

  @ApiProperty({ description: "portfolio url", example: "Portfolio url" })
  @Column({
    nullable: true,
  })
  portfolio_url?: string;

  @ApiProperty({
    description: "application condition",
    example: "technical_test",
  })
  @Column({
    type: "enum",
    enum: ApplicationStatusType,
  })
  status: ApplicationStatusType;

  @ApiProperty({ description: "Reason to reject", example: "Rude behaviour" })
  @Column({ type: "text", nullable: true })
  rejection_reason?: string;

  @ApiProperty({
    description: "Interview date",
    example: "2025-05-29",
  })
  @CreateDateColumn({ type: "timestamp", nullable: true })
  interview_date?: Date;

  @ApiProperty({
    description: "Job seeker's key feature written by Hr",
    example: "Rude behaviour",
  })
  @Column({ type: "text", nullable: true })
  interview_notes?: string;

  @ApiProperty({
    description: "A day when job seeker apply for this company",
    example: "2025-06-29",
  })
  @CreateDateColumn({ type: "timestamp", nullable: true })
  applied_at?: Date;

  @ApiProperty({
    description: "A first day when job seeker reed this vacancy",
    example: "2025-06-15",
  })
  @CreateDateColumn({ type: "timestamp", nullable: true })
  reviewed_at?: Date;

  @ApiProperty({
    description: "Application changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at?: Date;
  //========================

  @ApiProperty({
    type: () => Seeker,
    description: "Seeker info",
    example: "1",
  })
  @ManyToOne(() => Seeker, (seeker) => seeker.applications)
  seeker: Seeker;

  @ApiProperty({
    type: () => Vacancy,
    description: "Vacancy info",
    example: "1",
  })
  @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications)
  vacancy: Vacancy;
}
