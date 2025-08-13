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

@Entity("seeker_social_link")
export class SeekerSocialLink {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "bigint" })
  social_link_id: number;

  @Column({ type: "bigint" })
  seeker_id: number;

  @Column({ type: "varchar" })
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Seeker, (seeker) => seeker.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seeker_id" })
  seeker: Seeker;

  @ManyToOne(() => SocialLink, (socialLink) => socialLink.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "social_link_id" })
  socialLink: SocialLink;
}
