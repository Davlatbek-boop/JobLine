import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from '../../applications/entities/application.entity';
import { VacancySkill } from '../../vacancy_skills/entities/vacancy_skill.entity';

@Entity('vacancies')
export class Vacancy {
  @ApiProperty({ description: 'Vacancy unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Vacancy Title', example: 'Developer' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Description', example: 'Clean Working space' })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    description:
      'Mast have activities for job seeker to work with this company',
    example: 'Clean Working space',
  })
  @Column({
    type: 'text',
  })
  requirements: string;

  @ApiProperty({
    description:
      'Activities to do inserious manner for job seeker to work with this company',
    example: 'Clean Working space',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  responsibilities?: string;

  @ApiProperty({
    description: 'Company address',
    example: 'Tashkent Uzbekistan',
  })
  @Column({ nullable: true })
  address?: string;

  @ApiProperty({
    description: 'Companies minimum salary for new worker',
    example: '500',
  })
  @Column({ nullable: true })
  salaryFrom?: number;

  @ApiProperty({
    description: 'Companies maximum salary for new worker',
    example: '4000',
  })
  @Column({ nullable: true })
  salaryTo?: number;

  @ApiProperty({
    description: 'Companies minimum salary for new worker',
    example: 'Clean Working space',
  })
  @Column({ default: 'UZS', nullable: true })
  salaryCurrency?: string;

  @ApiProperty({
    description: 'Salary agreement',
    example: false,
  })
  @Column({ default: false, nullable: true })
  isSalaryNegotiable?: boolean;

  @ApiProperty({
    description: 'Working condition',
    example: 'hybrid',
  })
  @Column({
    type: 'enum',
    enum: ['on_site', 'remote', 'hybrid', 'field_based'],
  })
  workFormat: string;

  @ApiProperty({
    description: 'Working condition',
    example: '6_1',
  })
  @Column({
    type: 'enum',
    enum: [
      '6_1',
      '5_2',
      '4_4',
      '4_3',
      '4_2',
      '3_3',
      '3_2',
      '2_2',
      '2_1',
      '1_3',
      '1_2',
      'weekends_only',
      'flexible',
      'shift_work',
      'other',
    ],
  })
  workSchedule: string;

  @ApiProperty({
    description: 'Working days of week',
    example: 5,
  })
  @Column({ nullable: true })
  workHoursPerWeek?: number;

  @ApiProperty({
    description: 'Working format',
    example: 'full_time',
  })
  @Column({
    type: 'enum',
    enum: ['full_time', 'part_time', 'contract', 'internship', 'temporary'],
    default: 'full_time',
    nullable: true,
  })
  employmentType?: string;

  @ApiProperty({
    description: 'Working experience',
    example: 'no_experience',
  })
  @Column({
    type: 'enum',
    enum: [
      'no_experience',
      '1_to_3_years',
      '3_to_6_years',
      'more_than_6_years',
    ],
  })
  experienceRequired: string;

  @ApiProperty({
    description: 'Education level',
    example: 'bachelor',
  })
  @Column({
    type: 'enum',
    enum: [
      'no_requirement',
      'high_school',
      'vocational',
      'bachelor',
      'master',
      'phd',
    ],
    default: 'no_requirement',
    nullable: true,
  })
  educationRequired?: string;

  @ApiProperty({
    description: 'Maximum avaiable work staff count',
    example: '1',
  })
  @Column({ nullable: true })
  positionsAvailable?: number;

  @ApiProperty({
    description: 'Last date to apply for this vacancy',
    example: '2025-05-29',
  })
  @Column({ nullable: true })
  applicationDeadline?: Date;

  @ApiProperty({
    description: 'Company email',
    example: 'company@gmail.com',
  })
  @Column({ nullable: true })
  contactEmail?: string;

  @ApiProperty({
    description: 'Company phone',
    example: '+998901234567',
  })
  @Column({ nullable: true })
  contactPhone?: string;

  @ApiProperty({
    description: 'Vacancy condition',
    example: 'draft',
  })
  @Column({
    type: 'enum',
    enum: ['draft', 'active', 'paused', 'closed', 'expired'],
    default: 'active',
    nullable: true,
  })
  status?: string;

  @ApiProperty({
    description: 'Vacancy is hurry, or with unusuable feature or normal',
    example: 'normal',
  })
  @Column({
    type: 'enum',
    enum: ['normal', 'featured', 'urgent'],
    default: 'normal',
    nullable: true,
  })
  priority?: string;

  @ApiProperty({
    description: 'Number of view count',
    example: '1',
    nullable: true,
  })
  @Column({ default: 0 })
  views_count?: number;

  @ApiProperty({
    description: 'Number of appliers',
    example: '1',
  })
  @Column({ default: 0 })
  applications_count?: number;

  @ApiProperty({
    description: 'Vacancy Published date',
    example: '2025-05-29T10:30:00Z',
  })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  published_at?: Date;

  @ApiProperty({
    description: 'Vacancy expiry date',
    example: '2025-05-29T10:30:00Z',
  })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  expires_at?: Date;

  @ApiProperty({
    description: 'Vacancy Published date',
    example: '2025-05-29T10:30:00Z',
  })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at?: Date;

  @ApiProperty({
    description: 'Vacancy changed date',
    example: '2025-05-29T10:30:00Z',
  })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date;
  // @ApiProperty({
  //   type: () => Hr,
  //   description: "Hr info",
  //   example: "1",
  // })
  // @ManyToOne(() => Hr, (hr) => hr.vacancies)
  // hr: Hr;

  // @ApiProperty({
  //   type: () => Company,
  //   description: "Company info",
  //   example: "1",
  // })
  // @ManyToOne(() => Company, (hr) => hr.vacancies)
  // company: Company;

  // @ApiProperty({
  //   type: () => Specialization,
  //   description: "Specialization info",
  //   example: "1",
  // })
  // @ManyToOne(() => Specialization, (spec) => spec.vacancies)
  // specialization: Specialization;

  @ApiProperty({
    type: () => [Application],
    description: 'Application of Vacancies',
  })
  @OneToMany(() => Application, (application) => application.vacancy)
  applications: Application[];

  @ApiProperty({
    type: () => [VacancySkill],
    description: 'Required Skills of Vacancies',
  })
  @OneToMany(() => VacancySkill, (skill) => skill.vacancy)
  vacancySkills: VacancySkill[];
}
