import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from '../admin/admin.module';
import { HrModule } from '../hr/hr.module';
import { SeekersModule } from '../seekers/seekers.module';

import { AuthAdminController } from './admin/admin.controller';
import { HrAuthController } from './hr/hr.controller';
import { AuthSeekerController } from './seeker/seeker.controller';

import { AdminAuthService } from './admin/admin.service';
import { HrAuthService } from './hr/hr.service';
import { SeekerAuthService } from './seeker/seeker.service';

import { Admin } from '../admin/entities/admin.entity';
import { Hr } from '../hr/entities/hr.entity';
import { Seeker } from '../seekers/entities/seeker.entity';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([Admin, Hr, Seeker]),
    AdminModule,
    HrModule,
    SeekersModule,
  ],
  controllers: [AuthAdminController, HrAuthController, AuthSeekerController],
  providers: [AdminAuthService, HrAuthService, SeekerAuthService],
})
export class AuthModule {}
