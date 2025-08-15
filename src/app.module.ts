import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeekersModule } from './seekers/seekers.module';
import { EducationModule } from './education/education.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { SeekerSkillsModule } from './seeker-skills/seeker-skills.module';
import { SeekerSocialLinkModule } from './seeker-social-link/seeker-social-link.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { HrModule } from './hr/hr.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { VacanciesModule } from './vacancies/vacancies.module';
import { VacancySkillsModule } from './vacancy_skills/vacancy_skills.module';
import { ApplicationsModule } from './applications/applications.module';
import { CategoryModule } from './category/category.module';
import { SkillsModule } from './skills/skills.module';
import { SpecializationModule } from './specialization/specialization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    HrModule,
    SeekersModule,
    VacanciesModule,
    CategoryModule,
    CompaniesModule,
    VacancySkillsModule,
    ApplicationsModule,
    EducationModule,
    WorkExperienceModule,
    SeekerSkillsModule,
    SeekerSocialLinkModule,
    SocialLinksModule,
    CompaniesModule,
    CompaniesModule,
    AdminModule,
    SkillsModule,
    SpecializationModule,
  ],
})
export class AppModule {}
