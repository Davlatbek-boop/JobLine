import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { Skill } from "../../skills/entities/skill.entity";
import { Education } from "../../education/entities/education.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Specialization {
  @ApiProperty({ description: "HR unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Specialization name",
    example: "Backend Developer",
  })
  @Column()
  name: string;

  @ApiProperty({
    description: "About Specialization",
    example: "International work experience",
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ description: "Active Vacancies count", example: 1 })
  @Column({ nullable: true })
  active_vacancies_count: number;


  @ApiProperty({ description: "Is tis Specialization active", example: true })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Specialization added date",
    example: "2025-02-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty({
    description: "Specialization info last changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ApiProperty({
    type: () => Category,
    description: "Category info",
    example: "1",
  })
  @ManyToOne(() => Category, (category) => category.specialization, {
    onDelete: "CASCADE",
  })
  category: Category;

  @ApiProperty({
    type: () => [Skill],
    description: "Skills of Specialization",
  })
  @OneToMany(() => Skill, (skill) => skill.specialization)
  skill: Skill[];

  @ApiProperty({
    type: () => [Education],
    description: "Educations of Specialization",
  })
  @OneToMany(() => Education, (education) => education.specialization, {
    onDelete: "CASCADE",
  })
  education: Education[];
}
