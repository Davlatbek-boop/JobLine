import { Module } from "@nestjs/common";
import { SpecializationService } from "./specialization.service";
import { SpecializationController } from "./specialization.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Specialization } from "./entities/specialization.entity";
import { Category } from "../category/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Specialization, Category])],
  controllers: [SpecializationController],
  providers: [SpecializationService],
})
export class SpecializationModule {}
