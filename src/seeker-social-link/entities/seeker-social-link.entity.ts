import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Seeker } from "../../seekers/entities/seeker.entity";
import { SocialLink } from "../../social-links/entities/social-link.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("seeker_social_link")
export class SeekerSocialLink {
  @ApiProperty({ description: "SeekerSocialSkill unique ID" })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ description: "Social link unique ID", example: 1 })
  @Column({ type: "bigint" })
  social_link_id: number;

  @ApiProperty({ description: "Job Seeker unique ID", example: 1 })
  @Column({ type: "bigint" })
  seeker_id: number;

  @ApiProperty({
    description: "Social media networks' links",
    example: "www.example.uz",
  })
  @Column({ type: "varchar" })
  link: string;

  @ApiProperty({
    description: "A day when job seeker added social link",
    example: "2025-01-02",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "A day when job seeker changed social link",
    example: "2025-01-02",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    type: () => Seeker,
    description: "Seeker info",
    example: "1",
  })
  @ManyToOne(() => Seeker, (seeker) => seeker.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seeker_id" })
  seeker: Seeker;

  @ApiProperty({
    type: () => SocialLink,
    description: "Seeker info",
    example: "1",
  })
  @ManyToOne(() => SocialLink, (socialLink) => socialLink.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "social_link_id" })
  socialLink: SocialLink;
}
