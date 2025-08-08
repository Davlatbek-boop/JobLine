import { ApiProperty } from '@nestjs/swagger';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

export class CreateVacancySkillDto {
  @ApiProperty({ description: 'Is this skill required ?', example: true })
  isRequired: boolean;

  @ApiProperty({
    description: 'Proficiency level',
    example: 'intermediate',
  })
  proficiencyLevel?: string;

  @ApiProperty({
    description: 'Proficiency level',
    example: 'must_have',
  })
  priority?: string;

  // ==========================
  @ApiProperty({
    type: () => Vacancy,
    description: 'Vacancy info',
    example: '1',
  })
  vacancy: Vacancy;

  //   @ApiProperty({
  //     type: () => Skill,
  //     description: 'Skill info',
  //     example: '1',
  //   })
  //   skill: Skill;
}
