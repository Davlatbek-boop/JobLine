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
import { WorkExperienceService } from "./work-experience.service";
import { CreateWorkExperienceDto } from "./dto/create-work-experience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-work-experience.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { WorkExperience } from "./entities/work-experience.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { SeekerGuard } from "../common/guards/seeker.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@Controller("work-experience")
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "CREATE WorkExperience" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: WorkExperience,
  })
  @Post()
  create(@Body() createWorkExperienceDto: CreateWorkExperienceDto) {
    return this.workExperienceService.create(createWorkExperienceDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "GET ALL WorkExperiences" })
  @ApiResponse({
    status: 200,
    description: "List of WorkExperiences",
    type: [WorkExperience],
  })
  @Get()
  findAll() {
    return this.workExperienceService.findAll();
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "GET One WorkExperience By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "WorkExperience",
    type: WorkExperience,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workExperienceService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "UPDATE WorkExperience" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update WorkExperience",
    type: WorkExperience,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto
  ) {
    return this.workExperienceService.update(+id, updateWorkExperienceDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "DELETE WorkExperience" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete WorkExperience",
    type: WorkExperience,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workExperienceService.remove(+id);
  }
}
