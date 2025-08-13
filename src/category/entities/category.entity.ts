import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Specialization } from "../../specialization/entities/specialization.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Category {
  @ApiProperty({ description: "Category unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Category name", example: "Backend" })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: "Category extra info",
    example: "API | Database relations",
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    description: "Category condition",
    example: "2025-05-29T10:30:00Z",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Category changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty({
    description: "Categoory changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  
    @ApiProperty({
      type: () => [Specialization],
      description: 'Required Skill of Vacancies',
    })
  @OneToMany(() => Specialization, (specialization) => specialization.category)
  specialization: Specialization[];
}
{
}
