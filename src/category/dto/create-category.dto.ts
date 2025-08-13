import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Name of the enticty",
    example: "Main Branch",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: "Optional description of the entity",
    example: "This branch handles all the primary operations",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Status of the entity (true = active, false = inactive)",
    example: true,
  })
  @IsBoolean()
  is_active: boolean;
}
