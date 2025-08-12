import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum HrRole {
  Hr = 'hr',
  Recruiter = 'recruiter',
  Manager = 'manager',
  Owner = 'owner',
}

@Entity()
export class Hr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ length: 13 })
  phone_number: string;

  @Column({ length: 100 })
  position: string;

  @Column({ length: 100 })
  department: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  img_url: string;

  @Column()
  company_id: number;

  @Column({ default: false })
  role: boolean;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
