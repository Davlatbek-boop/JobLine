import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeekersModule } from './seekers/seekers.module';
import { EducationModule } from './education/education.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { SeekerSkillsModule } from './seeker-skills/seeker-skills.module';
import { SeekerSocialLinkModule } from './seeker-social-link/seeker-social-link.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { ApplicationsModule } from './applications/applications.module';
import { CategoryModule } from './category/category.module';
import { SkillsModule } from './skills/skills.module';
import { SpecializationModule } from './specialization/specialization.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { VacancySkillsModule } from './vacancy_skills/vacancy_skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SeekersModule,
    EducationModule,
    WorkExperienceModule,
    SeekerSkillsModule,
    SeekerSocialLinkModule,
    SocialLinksModule,
    ApplicationsModule,
    CategoryModule,
    SkillsModule,
    SpecializationModule,
    VacanciesModule,
    VacancySkillsModule,
  ],
})
export class AppModule {}
