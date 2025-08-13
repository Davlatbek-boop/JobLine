import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateSeekerSocialLinkDto {
  @ApiProperty({ description: "Social link unique ID", example: 1 })
  @IsNumber()
  social_link_id: number;

  @ApiProperty({ description: "Job Seeker unique ID", example: 1 })
  @IsNumber()
  seeker_id: number;

  @ApiProperty({
    description: "Social media networks' links",
    example: "www.example.uz",
  })
  @IsString()
  link: string;
}
