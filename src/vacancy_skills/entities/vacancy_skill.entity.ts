import { ApiProperty } from '@nestjs/swagger';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';

@Entity('vacancy_skills')
export class VacancySkill {
  @ApiProperty({ description: 'Vacancy skill unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Is this skill required ?', example: true })
  @Column({ nullable: true })
  isRequired: boolean;

  @ApiProperty({
    description: 'Proficiency level',
    example: 'intermediate',
  })
  @Column({
    type: 'enum',
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate',
    nullable: true,
  })
  proficiencyLevel?: string;

  @ApiProperty({
    description: 'Proficiency level',
    example: 'must_have',
  })
  @Column({
    type: 'enum',
    enum: ['must_have', 'nice_to_have'],
    default: 'must_have',
    nullable: true,
  })
  priority?: string;

  // ==========================
  @ApiProperty({
    type: () => Vacancy,
    description: 'Vacancy info',
    example: '1',
  })
  @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacancySkills)
  vacancy: Vacancy;

    @ApiProperty({
      type: () => Skill,
      description: 'Skill info',
      example: '1',
    })
    @ManyToOne(() => Skill, (skill) => skill.vacancySkills)
    skill: Skill;
}
