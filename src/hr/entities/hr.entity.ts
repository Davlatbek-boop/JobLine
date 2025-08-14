import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

export enum HrRole {
  Hr = 'hr',
  Recruiter = 'recruiter',
  Manager = 'manager',
  Owner = 'owner',
}

@Entity()
export class Hr {
  @ApiProperty({ description: "HR unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Hr name", example: "Zokir" })
  @Column({ length: 50 })
  first_name: string;

  @ApiProperty({ description: "Hr surname", example: "Bohodirov" })
  @Column({ length: 50 })
  last_name: string;

  @ApiProperty({ description: "Hr eamil", example: "example@gmail.com" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: "Password", example: "Passw0rd123!" })
  @Column()
  password_hash: string;

  @ApiProperty({ description: "Hr phone number", example: "+998900099889" })
  @Column({ length: 13 })
  phone_number: string;

  @ApiProperty({ description: "Hr position", example: "main" })
  @Column({ length: 100 })
  position: string;

  @ApiProperty({ description: "Branch name", example: "Chilonzor" })
  @Column({ length: 100 })
  department: string;

  @ApiProperty({ description: "About Hr", example: "Colm" })
  @Column({ type: "text", nullable: true })
  description: string;

  @ApiProperty({
    description: "Hr image link",
    example: "https://example.com/image",
  })
  @Column({ nullable: true })
  img_url: string;

  @ApiProperty({ description: "Company unique ID", example: 2 })
  @Column({nullable:true})
  company_id: number;

  @ApiProperty({ description: "Hr role", example: true })
  @Column({ default: false })
  role: boolean;

  @ApiProperty({
    description: "Hr token key to use site in his/her corner",
    example: "jcu2v48dkcbh8237",
  })
  @Column({ nullable: true })
  refresh_token: string;

  @ApiProperty({ description: "Is Hr at work or not ?", example: true })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Hr added date",
    example: "2025-02-29T10:30:00Z",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Hr info last changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn()
  updated_at: Date;


  @ManyToOne(()=> Company, (company)=> company.hr)
  company: Company

  @OneToMany(()=> Vacancy, (vacancies)=> vacancies.hr)
  vacancy: Vacancy[]
}
