import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Seeker } from '../../seekers/entities/seeker.entity';

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance',
  OTHER = 'other',
}

@Entity('work_experience')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  company_name: string;

  @Column({ type: 'varchar', nullable: true })
  position: string;

  @Column({ type: 'bigint', nullable: true })
  specialization_id: number;

  @Column({ type: 'bigint' })
  seeker_id: number;

  @Column({ type: 'enum', enum: EmploymentType })
  employment_type: EmploymentType;

  @Column({ type: 'date', nullable: true })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @Column({ type: 'boolean', default: false })
  is_current: boolean;

  @Column({ type: 'bigint', nullable: true })
  salary: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  currency: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  achievements: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Seeker, seeker => seeker.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seeker_id' })
  seeker: Seeker;

  @ManyToOne(() => Specialization, specialization => specialization.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'specialization_id' })
  specialization: Specialization;
}
