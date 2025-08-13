import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSocialLinkDto {
  @IsString()
  @ApiProperty({
    description: "Social media",
    example: "Telegram",
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: "Social media icon",
    example: "Telegram icon",
  })
  icon: string;
}
