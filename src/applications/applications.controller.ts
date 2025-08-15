import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  BadRequestException,
} from "@nestjs/common";
import { ApplicationsService } from "./applications.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Application, ApplicationStatusType } from "./entities/application.entity";

@Controller("applications")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiOperation({ summary: "CREATE Application" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Application,
  })
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @ApiOperation({ summary: "GET ALL Applications" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: "List of Applications",
    type: [Application],
  })
  @Get()
  findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.applicationsService.findAll(Number(page), Number(limit));
  }

  @ApiOperation({ summary: "GET One Application By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Application",
    type: Application,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.applicationsService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE Application" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update Application",
    type: Application,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ) {
    return this.applicationsService.update(+id, updateApplicationDto);
  }

  @ApiOperation({ summary: "DELETE Application" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete Application",
    type: Application,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.applicationsService.remove(+id);
  }

  // All applications for a vacancy (optional status + pagination)
  @ApiOperation({ summary: "Get all applications for a given vacancy" })
  @ApiParam({ name: "vacancyId", type: Number })
  @ApiQuery({ name: "status", required: false, example: "pending" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: "Get all Application by vacancy",
    type: [Application],
  })
  @Get("by-vacancy/:vacancyId")
  getByVacancy(
    @Param("vacancyId", ParseIntPipe) vacancyId: number,
    @Query("status") status?: ApplicationStatusType,
    @Query("page", new DefaultValuePipe(1)) page: number = 1,
    @Query("limit", new DefaultValuePipe(10)) limit: number = 10
  ) {
    return this.applicationsService.getApplicationsByVacancy(
      vacancyId,
      status,
      Number(page),
      Number(limit)
    );
  }

  // Filter applications by status with pagination
  @ApiOperation({ summary: "Filter applications by status" })
  @ApiQuery({ name: "status", required: true, example: "reviewed" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: "Filtered Applications",
    type: [Application],
  })
  @Get("filter/by-status")
  filterByStatus(
    @Query("status") status: ApplicationStatusType,
    @Query("page", new DefaultValuePipe(1)) page: number = 1,
    @Query("limit", new DefaultValuePipe(10)) limit: number = 10
  ) {
    return this.applicationsService.filterApplications(
      status,
      Number(page),
      Number(limit)
    );
  }
}
