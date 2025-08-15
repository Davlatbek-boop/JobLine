import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Education } from "./entities/education.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { SeekerGuard } from "../common/guards/seeker.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}


  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "CREATE Education" })
  @ApiResponse({
    status: 201,
    description: "Activation",
    type: Education,
  })
  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "GET ALL Educations" })
  @Get()
  findAll() {
    return this.educationService.findAll();
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "GET One Education By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Education",
    type: Education,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.educationService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "UPDATE Education" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update Education",
    type: Education,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEducationDto: UpdateEducationDto
  ) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "DELETE Education" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete Education",
    type: Education,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.educationService.remove(+id);
  }
}
