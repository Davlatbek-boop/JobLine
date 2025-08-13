import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateSpecializationDto {
  @ApiProperty({
    description: "Specialization name",
    example: "Backend Developer",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "About Specialization",
    example: "International work experience",
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: "Active Vacancies count", example: 1 })
  @IsOptional()
  @IsNumber()
  active_vacancies_count: number;

  @ApiProperty({
    description: "Category info",
    example: "1",
  })
  @IsNumber()
  category_id: number;

  @ApiProperty({ description: "Is tis Specialization active", example: true })
  @IsBoolean()
  is_active: boolean;
}
