import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { SeekerSkillsService } from "./seeker-skills.service";
import { CreateSeekerSkillDto } from "./dto/create-seeker-skill.dto";
import { UpdateSeekerSkillDto } from "./dto/update-seeker-skill.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SeekerSkill } from "./entities/seeker-skill.entity";

@Controller("seeker-skills")
export class SeekerSkillsController {
  constructor(private readonly seekerSkillsService: SeekerSkillsService) {}

  @ApiOperation({ summary: "CREATE SeekerSkill" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: SeekerSkill,
  })
  @Post()
  @ApiOperation({ summary: "Yangi seeker skill qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Seeker skill muvaffaqiyatli qo‘shildi",
  })
  create(@Body() createSeekerSkillDto: CreateSeekerSkillDto) {
    return this.seekerSkillsService.create(createSeekerSkillDto);
  }

  @ApiOperation({ summary: "GET ALL SeekerSkills" })
  @ApiResponse({
    status: 200,
    description: "List of SeekerSkills",
    type: [SeekerSkill],
  })
  @Get()
  @ApiOperation({ summary: "Barcha seeker skill’larni olish" })
  @ApiResponse({ status: 200, description: "Seeker skill ro‘yxati" })
  findAll() {
    return this.seekerSkillsService.findAll();
  }


  @ApiOperation({ summary: "GET One SeekerSkill By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "SeekerSkill",
    type: SeekerSkill,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seekerSkillsService.findOne(+id);
  }


  @ApiOperation({ summary: "UPDATE SeekerSkill" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update SeekerSkill",
    type: SeekerSkill,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSeekerSkillDto: UpdateSeekerSkillDto
  ) {
    return this.seekerSkillsService.update(+id, updateSeekerSkillDto);
  }


  @ApiOperation({ summary: "DELETE SeekerSkill" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete SeekerSkill",
    type: SeekerSkill,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seekerSkillsService.remove(+id);
  }
}
