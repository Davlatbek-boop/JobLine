import { Module } from '@nestjs/common';
import { SeekerSocialLinkService } from './seeker-social-link.service';
import { SeekerSocialLinkController } from './seeker-social-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerSocialLink } from './entities/seeker-social-link.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SeekerSocialLink])],
  controllers: [SeekerSocialLinkController],
  providers: [SeekerSocialLinkService],
})
export class SeekerSocialLinkModule {}
