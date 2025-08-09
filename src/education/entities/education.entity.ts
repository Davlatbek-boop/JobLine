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

export enum EducationLevel {
  HIGH_SCHOOL = 'high_school',
  BACHELOR = 'bachelor',
  MASTER = 'master',
  DOCTORATE = 'doctorate',
  OTHER = 'other',
}

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: true })
  specialization_id: number;

  @Column({ type: 'bigint' })
  seeker_id: number;

  @Column({ type: 'enum', enum: EducationLevel })
  level: EducationLevel;

  @Column({ type: 'varchar', nullable: true })
  institution_name: string;

  @Column({ type: 'varchar', nullable: true })
  faculty: string;

  @Column({ type: 'varchar', nullable: true })
  degree_name: string;

  @Column({ type: 'date', nullable: true })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @Column({ type: 'text', nullable: true })
  description: string;

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
