import { PartialType } from '@nestjs/swagger';
import { CreateSeekerSocialLinkDto } from './create-seeker-social-link.dto';

export class UpdateSeekerSocialLinkDto extends PartialType(CreateSeekerSocialLinkDto) {}
