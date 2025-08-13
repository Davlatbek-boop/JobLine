import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { HrModule } from "../hr/hr.module";
import { AdminController } from "../admin/admin.controller";
import { HrController } from "../hr/hr.controller";
import { SeekerController } from "./seeker/seeker.controller";
import { AdminService } from "../admin/admin.service";
import { HrService } from "../hr/hr.service";
import { SeekersService } from "../seekers/seekers.service";
import { SeekersModule } from "../seekers/seekers.module";
import { Admin } from "../admin/entities/admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hr } from "../hr/entities/hr.entity";
import { Seeker } from "../seekers/entities/seeker.entity";
// import { SeekerService } from './seeker/seeker.service';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([Admin]), // Register Admin entity for TypeORM
    TypeOrmModule.forFeature([Hr]), // Ensure Admin entity is registered
    TypeOrmModule.forFeature([Seeker]), // Ensure Admin entity is registered
    Admin,
    AdminModule,
    HrModule,
    SeekersModule,
  ],
  controllers: [AdminController, HrController, SeekerController],
  providers: [AdminService, HrService, SeekersService],
})
export class AuthModule {}
