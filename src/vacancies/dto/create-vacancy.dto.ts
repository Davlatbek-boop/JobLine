import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import {
  EmploymentType,
  PriorityType,
  RequiredEducationType,
  RequiredExperienceType,
  StatusType,
  WorkFormatType,
  WorkScheduleType,
} from "../entities/vacancy.entity";

export class CreateVacancyDto {
  @ApiProperty({ description: "Vacancy Title", example: "Developer" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Description", example: "Clean Working space" })
  @IsString()
  description: string;

  @ApiProperty({
    description:
      "Mast have activities for job seeker to work with this company",
    example: "Clean Working space",
  })
  @IsString()
  requirements: string;

  @ApiProperty({
    description:
      "Activities to do inserious manner for job seeker to work with this company",
    example: "Clean Working space",
  })
  @IsOptional()
  @IsString()
  responsibilities?: string;

  @ApiProperty({
    description: "Company address",
    example: "Tashkent Uzbekistan",
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: "Companies minimum salary for new worker",
    example: "500",
  })
  @IsOptional()
  @IsNumber()
  salaryFrom?: number;

  @ApiProperty({
    description: "Companies maximum salary for new worker",
    example: "4000",
  })
  @IsOptional()
  @IsNumber()
  salaryTo?: number;

  @ApiProperty({
    description: "Companies minimum salary for new worker",
    example: "Clean Working space",
  })
  @IsOptional()
  @IsString()
  salaryCurrency?: string;

  @ApiProperty({
    description: "Salary agreement",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isSalaryNegotiable?: boolean;

  @ApiProperty({
    description: "Working condition",
    example: WorkFormatType.HYBRID,
    enum: WorkFormatType,
  })
  @IsEnum(WorkFormatType)
  workFormat: WorkFormatType;

  @ApiProperty({
    description: "Working condition",
    example: WorkScheduleType.FLEXIBLE,
    enum: WorkScheduleType,
    required: false,
  })
  @IsEnum(WorkScheduleType, {
    message: "workSchedule must be a valid WorkScheduleType",
  })
  workSchedule?: WorkScheduleType;

  @ApiProperty({
    description: "Working days of week",
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  workHoursPerWeek?: number;

  @ApiProperty({
    description: "Working format",
    example: EmploymentType.INTERNSHIP,
    enum: EmploymentType,
    required: false,
  })
  @IsOptional()
  @IsString()
  employmentType?: EmploymentType;

  @ApiProperty({
    description: "Working experience",
    example: "no_experience",
    enum: RequiredExperienceType,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(RequiredExperienceType, {
    message: "experienceRequired must be a valid RequiredExperienceType",
  })
  experienceRequired: RequiredExperienceType;

  @ApiProperty({
    description: "Education level",
    example: "bachelor",
    enum: RequiredEducationType,
    required: false,
  })
  @IsOptional()
  @IsEnum(RequiredEducationType)
  educationRequired?: RequiredEducationType;

  @ApiProperty({
    description: "Maximum avaiable work staff count",
    example: "1",
  })
  @IsOptional()
  @IsInt()
  positionsAvailable?: number;

  @ApiProperty({
    description: "Last date to apply for this vacancy",
    example: "2025-05-29",
  })
  @IsOptional()
  @IsDateString()
  applicationDeadline?: Date;

  @ApiProperty({
    description: "Company email",
    example: "company@gmail.com",
  })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({
    description: "Company phone (Uzbekistan)",
    example: "+998901234567",
  })
  @IsOptional()
  @Matches(/^(\+?998)\d{9}$/, {
    message:
      "Phone number must be a valid Uzbekistan number (e.g. +998901234567)",
  })
  contactPhone?: string;

  @ApiProperty({
    description: "Vacancy condition",
    example: "draft",
    enum: StatusType,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusType)
  status?: StatusType;

  @ApiProperty({
    description: "Vacancy is hurry, or with unusuable feature or normal",
    example: "normal",
    enum: PriorityType,
    required: false,
  })
  @IsOptional()
  @IsEnum(PriorityType)
  priority?: PriorityType;

  @ApiProperty({
    description: "Vacancy Published date",
    example: "2025-05-19",
  })
  @IsOptional()
  @IsDateString()
  published_at?: Date;

  @ApiProperty({
    description: "Vacancy expiry date",
    example: "2025-05-29T10:30:00Z",
  })
  @IsOptional()
  @IsDateString()
  expires_at?: Date;

  @ApiProperty({
    description: "Hr info",
    example: "1",
  })
  hrId: number;

  @ApiProperty({
    description: "Company info",
    example: "1",
  })
  companyId: number;

  @ApiProperty({
    description: "Specialization info",
    example: "1",
  })
  specializationId: number;
}
