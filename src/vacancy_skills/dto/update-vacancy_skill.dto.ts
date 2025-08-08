import { PartialType } from '@nestjs/swagger';
import { CreateVacancySkillDto } from './create-vacancy_skill.dto';

export class UpdateVacancySkillDto extends PartialType(CreateVacancySkillDto) {}
