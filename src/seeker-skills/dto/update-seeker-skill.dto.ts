import { PartialType } from '@nestjs/swagger';
import { CreateSeekerSkillDto } from './create-seeker-skill.dto';

export class UpdateSeekerSkillDto extends PartialType(CreateSeekerSkillDto) {}
