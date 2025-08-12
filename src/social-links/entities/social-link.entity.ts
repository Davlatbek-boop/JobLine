import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SeekerSocialLink } from '../../seeker-social-link/entities/seeker-social-link.entity';

@Entity('social_links')
export class SocialLink {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  icon: string;

   @OneToMany(() => SeekerSocialLink, socialLink => socialLink.link)
    socialLink: SocialLink[];
}
