import { IsString } from 'class-validator';

export class CreateSocialLinkDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;
}
