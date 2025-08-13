// src/companies/entities/company.entity.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("companies")
export class Company {
  @ApiProperty({ description: "Application unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Company name", example: "Chevrolet" })
  @Column()
  name: string;

  @ApiProperty({ description: "Company email", example: "example@gamil.com" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: "Company call number", example: "+998980012345" })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({
    description: "Online company service or site",
    example: "company.com",
  })
  @Column({ nullable: true })
  website?: string;

  @ApiProperty({
    description: "Online company service or site",
    example: "company.com",
  })
  @Column({ nullable: true })
  location?: string;

  @ApiProperty({
    description: "Company address",
    example: "Uzbekistan Tashkent",
  })
  @Column({ type: "text", nullable: true })
  address?: string;

  @ApiProperty({
    description: "About Company",
    example: "Come, find job or worker, cowrker !!",
  })
  @Column({ type: "text", nullable: true })
  description?: string;

  @ApiProperty({ description: "Industry", example: "American Car Industry" })
  @Column({ nullable: true })
  industry?: string;

  @ApiProperty({ description: "Company founded year", example: "1952" })
  @Column({ type: "int", nullable: true })
  founded_year?: number;

  @ApiProperty({
    description: "Company photo or company logo",
    example: "https://Cherolet.png",
  })
  @Column({ nullable: true })
  img_url?: string;

  @ApiProperty({
    description: "Company certificate",
    example: "https://Cheroletcertificate.png",
  })
  @Column({ nullable: true })
  certificate?: string;

  @ApiProperty({
    description: "Defined",
    example: "true",
  })
  @Column({ default: false })
  is_verified: boolean;

  @ApiProperty({
    description: "Company rating",
    example: 4.6,
  })
  @Column({ type: "decimal", nullable: true })
  rating?: number;

  @ApiProperty({
    description: "Application created date",
    example: "2025-04-29T10:30:00Z",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Company changed date",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn()
  updated_at: Date;
}
