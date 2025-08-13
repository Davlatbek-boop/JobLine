import { Module } from '@nestjs/common';
import { SeekerSkillsService } from './seeker-skills.service';
import { SeekerSkillsController } from './seeker-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerSkill } from './entities/seeker-skill.entity';
import { Seeker } from '../seekers/entities/seeker.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SeekerSkill, Seeker])],
  controllers: [SeekerSkillsController],
  providers: [SeekerSkillsService],
})
export class SeekerSkillsModule {}
