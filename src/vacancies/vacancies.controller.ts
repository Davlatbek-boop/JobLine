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
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { VacanciesService } from "./vacancies.service";
import { CreateVacancyDto } from "./dto/create-vacancy.dto";
import { UpdateVacancyDto } from "./dto/update-vacancy.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { Vacancy } from "./entities/vacancy.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { HrSelfGuard } from "../common/guards/hr-self.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";
import { SeekerGuard } from "../common/guards/seeker.guard";

@Controller("vacancies")
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrSelfGuard)
  @ApiOperation({ summary: "CREATE Vacancy" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Vacancy,
  })
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "GET ALL Vacancies" })
  @ApiResponse({
    status: 200,
    description: "List of Vacancies",
    type: [Vacancy],
  })
  @Get()
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.vacanciesService.findAll(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "GET One Vacancy By Id" })
  @ApiResponse({
    status: 200,
    description: "Vacancy",
    type: Vacancy,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vacanciesService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @ApiOperation({ summary: "UPDATE Vacancy" })
  @ApiResponse({
    status: 200,
    description: "Update Vacancy",
    type: Vacancy,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(+id, updateVacancyDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @ApiOperation({ summary: "DELETE Vacancy" })
  @ApiResponse({
    status: 200,
    description: "Delete Vacancy",
    type: Vacancy,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.vacanciesService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrSelfGuard)
  @ApiOperation({ summary: "get Vacancy by hr id" })
  @ApiResponse({
    status: 200,
    description: "get Vacancy by hr id",
    type: Vacancy,
  })
  @Get("by-hr/:id")
  getAllVacancyByHrId(@Param("id") id: string) {
    return this.vacanciesService.getAllVacancyByHrId(+id);
  }

  
}
