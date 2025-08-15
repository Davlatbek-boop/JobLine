// src/companies/companies.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Company } from './entities/company.entity';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { HrGuard } from '../common/guards/hr.guard';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, type: Company })
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, type: [Company] })
  findAll() {
    return this.companiesService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiResponse({ status: 200, type: Company })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update company by ID' })
  @ApiResponse({ status: 200, type: Company })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete company by ID' })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Get(':id/hr')
  @ApiOperation({ summary: 'Get hr by company ID' })
  @ApiResponse({ status: 200, description: 'get successfully' })
  getAllHrWithCompanyId(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.getAllHrWithCompanyId(id);
  }

  
}
