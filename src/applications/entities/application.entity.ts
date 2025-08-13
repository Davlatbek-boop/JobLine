import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

@Entity('applications')
export class Application {
  @ApiProperty({ description: 'Application unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Cover letter', example: 'Cover letter' })
  @Column({ type: 'text', nullable: true })
  cover_letter?: string;

  @ApiProperty({ description: 'Resume file', example: 'Resume file' })
  @Column({
    nullable: true,
  })
  resume_file?: string;

  @ApiProperty({ description: 'portfolio url', example: 'Portfolio url' })
  @Column({
    nullable: true,
  })
  portfolio_url?: string;

  @ApiProperty({
    description: 'application condition',
    example: 'technical_test',
  })
  @Column({
    type: 'enum',
    enum: [
      'pending',
      'reviewed',
      'shortlisted',
      'interview_scheduled',
      'interviewed',
      'technical_test',
      'reference_check',
      'offered',
      'accepted',
      'rejected',
      'withdrawn',
      'expired',
    ],
  })
  status: string;

  @ApiProperty({ description: 'Reason to reject', example: 'Rude behaviour' })
  @Column({ type: 'text', nullable: true })
  rejection_reason?: string;

  @ApiProperty({
    description: 'Interview date',
    example: '2025-05-29',
  })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  interview_date?: Date;

  @ApiProperty({
    description: "Job seeker's key feature written by Hr",
    example: 'Rude behaviour',
  })
  @Column({ type: 'text', nullable: true })
  interview_notes?: string;

  @ApiProperty({
    description: 'A day when job seeker apply for this company',
    example: '2025-06-29',
  })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  applied_at?: Date;

  @ApiProperty({
    description: 'A first day when job seeker reed this vacancy',
    example: '2025-06-15',
  })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  reviewed_at?: Date;

  @ApiProperty({
    description: 'Application changed date',
    example: '2025-05-29T10:30:00Z',
  })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;
  //========================

  //   @ApiProperty({
  //     type: () => Seeker,
  //     description: 'Seeker info',
  //     example: '1',
  //   })
  //   @ManyToOne(() => Seeker, (seeker) => seeker.applications)
  //   seeker: Seeker;

  @ApiProperty({
    type: () => Vacancy,
    description: 'Vacancy info',
    example: '1',
  })
  @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications)
  vacancy: Vacancy;


  // O'chirishim kerak
  // @ApiProperty({
  //   type: () => [VacancySkill],
  //   description: 'Required Skill of Vacancies',
  // })
  // @OneToMany(() => VacancySkill, (skill) => skill.vacancy)
  // vacancySkills: VacancySkill[];
}
