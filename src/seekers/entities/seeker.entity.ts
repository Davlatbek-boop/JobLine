import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from "typeorm";
import { WorkExperience } from "../../work-experience/entities/work-experience.entity";
import { Education } from "../../education/entities/education.entity";
import { SeekerSkill } from "../../seeker-skills/entities/seeker-skill.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Application } from "../../applications/entities/application.entity";
import { SeekerSocialLink } from "../../seeker-social-link/entities/seeker-social-link.entity";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
}

export enum PreferredWorkForm {
  REMOTE = "remote",
  ONSITE = "onsite",
  HYBRID = "hybrid",
}

@Entity("seekers")
@Index(["first_name", "last_name", "description"])
@Index(["city", "country"])
@Index(["status", "is_active"])
export class Seeker {
  @ApiProperty({ description: "HR unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Job seeker name", example: "Olim" })
  @Column({ type: "varchar", nullable: true })
  first_name: string;

  @ApiProperty({ description: "Job seeker surname", example: "Nodirov" })
  @Column({ type: "varchar", nullable: true })
  last_name: string;

  @ApiProperty({
    description: "Job seeker eamil",
    example: "example@gmail.com",
  })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ description: "Password", example: "Passw0rd123!" })
  @Column({ type: "varchar" })
  password_hash: string;

  @ApiProperty({
    description: "Job seeker phone number",
    example: "+998993330000",
  })
  @Column({ type: "varchar", nullable: true })
  phone_number: string;

  @ApiProperty({ description: "Date of birth", example: "2000-02-03" })
  @Column({ type: "date", nullable: true })
  birth_date: string;

  @ApiProperty({ description: "Gender", example: Gender.MALE })
  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender;

  @ApiProperty({ description: "Address", example: "20-01-15" })
  @Column({ type: "text", nullable: true })
  address: string;

  @ApiProperty({ description: "City name", example: "Tashkent" })
  @Column({ type: "varchar", nullable: true })
  city: string;

  @ApiProperty({ description: "Country name", example: "Chilonzor" })
  @Column({ type: "varchar", nullable: true })
  country: string;

  @ApiProperty({ description: "Description", example: "Intelligent, sociable" })
  @Column({ type: "text", nullable: true })
  description: string;

  @ApiProperty({
    description: "Job seeker image link",
    example: "https://example.com/image",
  })
  @Column({ type: "varchar", nullable: true })
  img_url: string;

  @ApiProperty({
    description: "Job seeker social media link unique ID",
    example: 1,
  })
  @Column({ type: "bigint", nullable: true })
  social_links_id: number;

  @ApiProperty({ description: "languages", example: "en, ru, uz" })
  @Column({ type: "json", nullable: true })
  languages: any;

  @ApiProperty({ description: "Resume file", example: "Resume file" })
  @Column({ type: "varchar", nullable: true })
  resume_file: string;

  @ApiProperty({ description: "Expected minimum salary", example: 300 })
  @Column({ type: "bigint", nullable: true })
  expected_salary_min: number;

  @ApiProperty({ description: "Expected miximum salary", example: 4000 })
  @Column({ type: "bigint", nullable: true })
  expected_salary_max: number;

  @ApiProperty({
    description: "Preferred work format",
    example: PreferredWorkForm.HYBRID,
  })
  @Column({ type: "enum", enum: PreferredWorkForm, nullable: true })
  preferred_work_form: PreferredWorkForm;

  @ApiProperty({
    description: "Preferred location to work",
    example: "Coffee station",
  })
  @Column({ type: "json", nullable: true })
  preferred_locations: any;

  @ApiProperty({
    description: "Job seeker status",
    example: Status.ACTIVE,
  })
  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  status: Status;


  @Column({ type: 'varchar', nullable: true })
  hashed_refresh_token: string;

  @ApiProperty({ description: "Is Job seeker at work or not ?", example: true })
  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Job seeker added date",
    example: "2025-02-29T10:30:00Z",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Job seeker info last changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    type: () => [WorkExperience],
    description: "List of Job Seeker working experience",
  })
  @OneToMany(() => WorkExperience, (workExperience) => workExperience.seeker)
  work_experiences: WorkExperience[];

  @ApiProperty({
    type: () => [Education],
    description: "List of Job Seeker education",
  })
  @OneToMany(() => Education, (education) => education.seeker)
  education: Education[];

  @ApiProperty({
    type: () => [SeekerSkill],
    description: "List of Job Seeker skills",
  })
  @OneToMany(() => SeekerSkill, (skill) => skill.skill)
  skill: SeekerSkill[];


  @ApiProperty({
    type: () => [Application],
    description: "List of Aplication",
  })
  @OneToMany(() => Application, (application) => application.seeker)
  applications: Application[];


   @ApiProperty({
    type: () => [SeekerSocialLink],
    description: "List of seekerSocialLink",
  })
  @OneToMany(() => SeekerSocialLink, (seekerSocialLink) => seekerSocialLink.seeker)
  seekerSocialLink: SeekerSocialLink[];
}
