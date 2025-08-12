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

@Entity()
export class Specialization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  active_vacancies_count: number;

  @Column({ nullable: true })
  sort_order: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.specialization, {
    onDelete: "CASCADE",
  })
  category: Category;

  @OneToMany(() => Skill, (skill) => skill.specialization)
  skill: Skill[];

  @OneToMany(() => Education, (education) => education.specialization, {
    onDelete: 'CASCADE',
  })
  education: Education[];
}

