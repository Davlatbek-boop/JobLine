import { ApiProperty } from '@nestjs/swagger';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Cover letter', example: 'Cover letter' })
  cover_letter?: string;

  @ApiProperty({ description: 'Resume file', example: 'Resume file' })
  resume_file?: string;

  @ApiProperty({ description: 'Portfolio url', example: 'Portfolio url' })
  portfolio_url?: string;

  @ApiProperty({
    description: 'Application condition',
    example: 'technical_test',
  })
  status: string;

  @ApiProperty({ description: 'Reason to reject', example: 'Rude behaviour' })
  rejection_reason?: string;

  @ApiProperty({
    description: 'Interview date',
    example: '2025-05-29',
  })
  interview_date?: Date;

  @ApiProperty({
    description: "Job seeker's key feature written by Hr",
    example: 'Rude behaviour',
  })
  interview_notes?: string;

  @ApiProperty({
    description: 'A day when job seeker apply for this company',
    example: '2025-06-29',
  })
  applied_at?: Date;

  @ApiProperty({
    description: 'A first day when job seeker reed this vacancy',
    example: '2025-06-15',
  })
  reviewed_at?: Date;

  @ApiProperty({
    description: 'Vacancy info',
    example: '1',
  })
  vacancy: Vacancy;

  //   @ApiProperty({
  //     description: 'Seeker info',
  //     example: '1',
  //   })
  //   seeker: Seeker;
}
