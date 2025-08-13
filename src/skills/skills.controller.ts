import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@ApiTags("Skills") // Swagger group name
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new skill" })
  @ApiResponse({ status: 201, description: "Skill successfully created" })
  @ApiBody({ type: CreateSkillDto })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all skills" })
  @ApiResponse({ status: 200, description: "List of skills" })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single skill" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID number" })
  @ApiResponse({ status: 200, description: "Skill found" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  findOne(@Param("id") id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update skill information" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID number" })
  @ApiBody({ type: UpdateSkillDto })
  @ApiResponse({ status: 200, description: "Skill successfully updated" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  update(@Param("id") id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a skill" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID number" })
  @ApiResponse({ status: 200, description: "Skill successfully deleted" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  remove(@Param("id") id: string) {
    return this.skillsService.remove(+id);
  }
}
