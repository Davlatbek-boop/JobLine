import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Vacancy } from './entities/vacancy.entity';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiOperation({ summary: 'CREATE Vacancy' })
  @ApiResponse({
    status: 200,
    description: 'Activation',
    type: Vacancy,
  })
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @ApiOperation({ summary: 'GET ALL Vacancies' })
  @ApiResponse({
    status: 200,
    description: 'List of Vacancies',
    type: [Vacancy],
  })
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.vacanciesService.findAll(Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'GET One Vacancy By Id' })
  @ApiResponse({
    status: 200,
    description: 'Vacancy',
    type: Vacancy,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(+id);
  }

  @ApiOperation({ summary: 'UPDATE Vacancy' })
  @ApiResponse({
    status: 200,
    description: 'Update Vacancy',
    type: Vacancy,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(+id, updateVacancyDto);
  }

  @ApiOperation({ summary: 'DELETE Vacancy' })
  @ApiResponse({
    status: 200,
    description: 'Delete Vacancy',
    type: Vacancy,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(+id);
  }
}
