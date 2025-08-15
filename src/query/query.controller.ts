import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryService } from './query.service';

@ApiTags('Query')
@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('top-companies')
  @ApiOperation({
    summary: ' Eng ko‘p aktiv vakansiyaga ega kompaniyalarni topish',
  })
  @ApiResponse({
    status: 200,
    description: 'Top kompaniyalar ro‘yxati qaytariladi',
  })
  async getTopCompanies() {
    return await this.queryService.getTopCompanies();
  }

  @Get('specializations-salary')
  @ApiOperation({
    summary: 'Har bir mutaxassislik bo‘yicha o‘rtacha maosh oralig‘ini topish',
  })
  @ApiResponse({
    status: 200,
    description: 'Har bir mutaxassislik bo‘yicha minimal va maksimal ish haqi',
  })
  async getSpecializationsSalary() {
    return await this.queryService.getSpecializationsSalary();
  }

  @Get('seekers-skills')
  @ApiOperation({
    summary: 'Oxirgi 30 kunda eng ko‘p ariza qabul qilgan vakansiyalar',
  })
  @ApiResponse({
    status: 200,
    description: 'Har bir ish qidiruvchi bo‘yicha skill soni',
  })
  async getSeekersSkills() {
    return await this.queryService.getSeekersSkills();
  }

  @Get('top-seekers')
  @ApiOperation({
    summary:
      'Har bir ish qidiruvchi uchun nechta ko‘nikma borligini ko‘rsatish',
  })
  @ApiResponse({ status: 200, description: 'Top ish qidiruvchilar ro‘yxati' })
  async getTopSeekersBySkills() {
    return this.queryService.topSeekersBySkills();
  }

  @Get('top-hr')
  @ApiOperation({
    summary: 'Hozirda faol bo‘lgan HR’lar va ular ishlayotgan kompaniyalar',
  })
  @ApiResponse({ status: 200, description: 'Top HR ro‘yxati qaytariladi' })
  async getTopHRByManagedVacancies() {
    return this.queryService.topHRByManagedVacancies();
  }

  @Get('specialization-demand-skills')
  @ApiOperation({ summary: 'Mutaxassislik bo‘yicha eng talabgir ko‘nikmalar' })
  async getSpecializationDemandSkills() {
    return this.queryService.getSpecializationDemandSkills();
  }
}
