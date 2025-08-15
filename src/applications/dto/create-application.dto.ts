import { ApiProperty } from "@nestjs/swagger";
import { Vacancy } from "../../vacancies/entities/vacancy.entity";
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { ApplicationStatusType } from "../entities/application.entity";

export class CreateApplicationDto {
  @ApiProperty({ description: "Cover letter", example: "Cover letter" })
  @IsOptional()
  @IsString()
  cover_letter?: string;

  @ApiProperty({ description: "Resume file", example: "Resume file" })
  @IsOptional()
  @IsString()
  resume_file?: string;

  @ApiProperty({ description: "Portfolio url", example: "Portfolio url" })
  @IsOptional()
  @IsString()
  portfolio_url?: string;

  @ApiProperty({
    description: "Application condition",
    example: ApplicationStatusType.TECHNICAL_TEST,
    enum: ApplicationStatusType,
  })
  @IsEnum(ApplicationStatusType)
  status: ApplicationStatusType;

  @ApiProperty({ description: "Reason to reject", example: "Rude behaviour" })
  @IsOptional()
  @IsString()
  rejection_reason?: string;

  @ApiProperty({
    description: "Interview date",
    example: "2025-05-29",
  })
  @IsOptional()
  @IsDateString()
  interview_date?: Date;

  @ApiProperty({
    description: "Job seeker's key feature written by Hr",
    example: "Rude behaviour",
  })
  @IsOptional()
  @IsString()
  interview_notes?: string;

  @ApiProperty({
    description: "Vacancy info",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  vacancyId: number;

  @ApiProperty({
    description: "Seeker info",
    example: "1",
  })
  seekerId: number;
}
