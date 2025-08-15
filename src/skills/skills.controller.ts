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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Skills") // Swagger group name
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  @ApiOperation({ summary: "Create a new skill" })
  @ApiResponse({ status: 201, description: "Skill successfully created" })
  @ApiBody({ type: CreateSkillDto })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Get all skills" })
  @ApiResponse({ status: 200, description: "List of skills" })
  findAll() {
    return this.skillsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a single skill" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID number" })
  @ApiResponse({ status: 200, description: "Skill found" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  findOne(@Param("id") id: string) {
    return this.skillsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update skill information" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID number" })
  @ApiBody({ type: UpdateSkillDto })
  @ApiResponse({ status: 200, description: "Skill successfully updated" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  update(@Param("id") id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a skill" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID number" })
  @ApiResponse({ status: 200, description: "Skill successfully deleted" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  remove(@Param("id") id: string) {
    return this.skillsService.remove(+id);
  }
}
