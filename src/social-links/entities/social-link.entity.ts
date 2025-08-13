import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SeekerSocialLink } from "../../seeker-social-link/entities/seeker-social-link.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("social_links")
export class SocialLink {
  @ApiProperty({ description: "Social link unique ID" })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({
    description: "Social media",
    example: "Telegram",
  })
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty({
    description: "Social media icon",
    example: "Telegram icon",
  })
  @Column({ type: "varchar"})
  icon: string;

  @ApiProperty({
    type: () => [SeekerSocialLink],
    description: "Social network links of Job seeker",
  })
  @OneToMany(() => SeekerSocialLink, (socialLink) => socialLink.link)
  socialLink: SocialLink[];
}
