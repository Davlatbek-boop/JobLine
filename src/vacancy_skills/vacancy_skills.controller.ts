import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VacancySkillsService } from './vacancy_skills.service';
import { CreateVacancySkillDto } from './dto/create-vacancy_skill.dto';
import { UpdateVacancySkillDto } from './dto/update-vacancy_skill.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VacancySkill } from './entities/vacancy_skill.entity';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { HrGuard } from '../common/guards/hr.guard';
import { SeekerGuard } from '../common/guards/seeker.guard';

@Controller('vacancy_skills')
export class VacancySkillsController {
  constructor(private readonly vacancySkillsService: VacancySkillsService) {}


  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrGuard)
  @ApiOperation({ summary: 'CREATE Vacancy Skill' })
  @ApiResponse({
    status: 200,
    description: 'Activation',
    type: VacancySkill,
  })
  @Post()
  create(@Body() createVacancySkillDto: CreateVacancySkillDto) {
    return this.vacancySkillsService.create(createVacancySkillDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: 'GET ALL Vacancy Skills' })
  @ApiResponse({
    status: 200,
    description: 'List of Vacancy Skills',
    type: [VacancySkill],
  })
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.vacancySkillsService.findAll(Number(page), Number(limit));
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: 'GET One Vacancy Skill By Id' })
  @ApiResponse({
    status: 200,
    description: 'Vacancy Skill',
    type: VacancySkill,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacancySkillsService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrGuard)
  @ApiOperation({ summary: 'UPDATE Vacancy Skill' })
  @ApiResponse({
    status: 200,
    description: 'Update Vacancy Skill',
    type: VacancySkill,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacancySkillDto: UpdateVacancySkillDto,
  ) {
    return this.vacancySkillsService.update(+id, updateVacancySkillDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: 'DELETE Vacancy Skill' })
  @ApiResponse({
    status: 200,
    description: 'Delete Vacancy Skill',
    type: VacancySkill,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacancySkillsService.remove(+id);
  }
}

