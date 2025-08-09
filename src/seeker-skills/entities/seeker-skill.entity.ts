import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index, JoinColumn } from 'typeorm';
import { Seeker } from '../../seekers/entities/seeker.entity';
// import { Skill } from './skill.entity';

@Entity('seeker_skills')
@Index(['seeker', 'skill'], { unique: true })
export class SeekerSkill {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint' })
  skill_id: number;

  @Column({ type: 'bigint' })
  seeker_id: number;

  @Column({ type: 'enum', enum: ['beginner', 'intermediate', 'advanced'], nullable: true })
  proficiency_level: 'beginner' | 'intermediate' | 'advanced';

  @Column({ type: 'boolean', nullable: true })
  is_certified: boolean;

  @CreateDateColumn()
  created_at: Date;

    @ManyToOne(() => Seeker, seeker => seeker.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'seeker_id' })
    seeker: Seeker;

    @ManyToOne(() => Skill, skill => skill.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skill_id' })
    skill: Skill;
}
