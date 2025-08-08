import { Module } from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { SkillsController } from "./skills.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "./entities/skill.entity";
import { Specialization } from "../specialization/entities/specialization.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Skill, Specialization])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
