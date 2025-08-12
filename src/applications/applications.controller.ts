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
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiOperation({ summary: 'CREATE Vacancy' })
  @ApiResponse({
    status: 200,
    description: 'Activation',
    type: Application,
  })
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @ApiOperation({ summary: 'GET ALL Applications' })
  @ApiResponse({
    status: 200,
    description: 'List of Applications',
    type: [Application],
  })
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.applicationsService.findAll(Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'GET One Application By Id' })
  @ApiResponse({
    status: 200,
    description: 'Application',
    type: Application,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  @ApiOperation({ summary: 'UPDATE Application' })
  @ApiResponse({
    status: 200,
    description: 'Update Application',
    type: Application,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(+id, updateApplicationDto);
  }

  @ApiOperation({ summary: 'DELETE Application' })
  @ApiResponse({
    status: 200,
    description: 'Delete Application',
    type: Application,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
