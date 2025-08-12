import { IsNumber, IsString } from 'class-validator';

export class CreateSeekerSocialLinkDto {
  @IsNumber()
  social_link_id: number;

  @IsNumber()
  seeker_id: number;

  @IsString()
  link: string;
}
