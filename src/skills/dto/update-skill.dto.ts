import { SkillType } from "../entities/skill.entity";

export class UpdateSkillDto {
  name?: string;
  description?: string;
  specializationId?: number;
  skill_type?: SkillType;
  is_active?: boolean;
}
