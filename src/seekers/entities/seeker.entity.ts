import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { WorkExperience } from '../../work-experience/entities/work-experience.entity';
import { Education } from '../../education/entities/education.entity';
import { SeekerSkill } from '../../seeker-skills/entities/seeker-skill.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

export enum PreferredWorkForm {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
}

@Entity('seekers')
@Index(['first_name', 'last_name', 'description'])
@Index(['city', 'country'])
@Index(['status', 'is_active'])
export class Seeker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password_hash: string;

  @Column({ type: 'varchar', nullable: true })
  phone_number: string;

  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  img_url: string;

  @Column({ type: 'bigint', nullable: true })
  social_links_id: number;

  @Column({ type: 'json', nullable: true })
  languages: any;

  @Column({ type: 'varchar', nullable: true })
  resume_file: string;

  @Column({ type: 'bigint', nullable: true })
  expected_salary_min: number;

  @Column({ type: 'bigint', nullable: true })
  expected_salary_max: number;

  @Column({ type: 'enum', enum: PreferredWorkForm, nullable: true })
  preferred_work_form: PreferredWorkForm;

  @Column({ type: 'json', nullable: true })
  preferred_locations: any;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'varchar', nullable: true })
  refresh_token: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

    @OneToMany(() => WorkExperience, workExperience => workExperience.seeker)
    work_experiences: WorkExperience[];

    @OneToMany(() => Education, education => education.seeker)
    education: Education[];

    @OneToMany(() => SeekerSkill, skill => skill.skill)
    skill: SeekerSkill[];
}
