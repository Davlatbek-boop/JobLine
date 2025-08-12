import { Module } from '@nestjs/common';
import { VacancySkillsService } from './vacancy_skills.service';
import { VacancySkillsController } from './vacancy_skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancySkill } from './entities/vacancy_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacancySkill])],
  controllers: [VacancySkillsController],
  providers: [VacancySkillsService],
})
export class VacancySkillsModule {}
