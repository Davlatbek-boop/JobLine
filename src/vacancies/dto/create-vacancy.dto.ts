import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class CreateVacancyDto {
  @ApiProperty({ description: 'Vacancy Title', example: 'Developer' })
  title: string;

  @ApiProperty({ description: 'Description', example: 'Clean Working space' })
  description: string;

  @ApiProperty({
    description:
      'Mast have activities for job seeker to work with this company',
    example: 'Clean Working space',
  })
  requirements: string;

  @ApiProperty({
    description:
      'Activities to do inserious manner for job seeker to work with this company',
    example: 'Clean Working space',
  })
  responsibilities?: string;

  @ApiProperty({
    description: 'Company address',
    example: 'Tashkent Uzbekistan',
  })
  address?: string;

  @ApiProperty({
    description: 'Companies minimum salary for new worker',
    example: '500',
  })
  salaryFrom?: number;

  @ApiProperty({
    description: 'Companies maximum salary for new worker',
    example: '4000',
  })
  salaryTo?: number;

  @ApiProperty({
    description: 'Companies minimum salary for new worker',
    example: 'Clean Working space',
  })
  salaryCurrency?: string;

  @ApiProperty({
    description: 'Salary agreement',
    example: false,
  })
  isSalaryNegotiable?: boolean;

  @IsEnum(['on_site', 'remote', 'hybrid', 'field_based'])
  @ApiProperty({
    description: 'Working condition',
    example: 'hybrid',
  })
  workFormat: string;

  @ApiProperty({
    description: 'Working condition',
    example: 'flexible',
  })
  workSchedule: string;

  @ApiProperty({
    description: 'Working days of week',
    example: 5,
  })
  workHoursPerWeek?: number;

  @ApiProperty({
    description: 'Working format',
    example: 'full_time',
  })
  employmentType?: string;

  @IsEnum([
    'no_experience',
    '1_to_3_years',
    '3_to_6_years',
    'more_than_6_years',
  ])
  @ApiProperty({
    description: 'Working experience',
    example: 'no_experience',
  })
  experienceRequired: string;

  @ApiProperty({
    description: 'Education level',
    example: 'bachelor',
  })
  educationRequired?: string;

  @ApiProperty({
    description: 'Maximum avaiable work staff count',
    example: '1',
  })
  positionsAvailable?: number;

  @ApiProperty({
    description: 'Last date to apply for this vacancy',
    example: '2025-05-29',
  })
  applicationDeadline?: Date;

  @ApiProperty({
    description: 'Company email',
    example: 'company@gmail.com',
  })
  contactEmail?: string;

  @ApiProperty({
    description: 'Company phone',
    example: '+998901234567',
  })
  contactPhone?: string;

  @ApiProperty({
    description: 'Vacancy condition',
    example: 'draft',
  })
  status?: string;

  @ApiProperty({
    description: 'Vacancy is hurry, or with unusuable feature or normal',
    example: 'normal',
  })
  priority?: string;

  @ApiProperty({
    description: 'Vacancy Published date',
    example: '2025-05-19',
  })
  published_at?: Date;

  @ApiProperty({
    description: 'Vacancy expiry date',
    example: '2025-05-29T10:30:00Z',
  })
  expires_at?: Date;

  // @ApiProperty({
  //   description: "Hr info",
  //   example: "1",
  // })
  // hr: Hr;

  // @ApiProperty({
  //   description: "Company info",
  //   example: "1",
  // })
  // company: Company;

  // @ApiProperty({
  //   description: "Specialization info",
  //   example: "1",
  // })
  // specialization: Specialization;
}
