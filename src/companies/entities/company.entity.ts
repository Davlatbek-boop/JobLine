// src/companies/entities/company.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ type: 'int', nullable: true })
  founded_year?: number;

  @Column({ nullable: true })
  img_url?: string;

  @Column({ nullable: true })
  certificate?: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: 'decimal', nullable: true })
  rating?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
