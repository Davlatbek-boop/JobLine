import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Education } from "./entities/education.entity";

@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

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

  @ApiOperation({ summary: "GET ALL Educations" })
  @Get()
  findAll() {
    return this.educationService.findAll();
  }

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
