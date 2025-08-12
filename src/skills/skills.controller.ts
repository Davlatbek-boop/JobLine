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

@ApiTags("Skills") // Swagger'da guruh nomi
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi skill yaratish" })
  @ApiResponse({ status: 201, description: "Skill muvaffaqiyatli yaratildi" })
  @ApiBody({ type: CreateSkillDto })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha skilllarni olish" })
  @ApiResponse({ status: 200, description: "Skilllar ro‘yxati" })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta skillni olish" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan skill" })
  @ApiResponse({ status: 404, description: "Skill topilmadi" })
  findOne(@Param("id") id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Skill ma'lumotini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID raqami" })
  @ApiBody({ type: UpdateSkillDto })
  @ApiResponse({ status: 200, description: "Skill muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Skill topilmadi" })
  update(@Param("id") id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Skillni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Skill ID raqami" })
  @ApiResponse({ status: 200, description: "Skill muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Skill topilmadi" })
  remove(@Param("id") id: string) {
    return this.skillsService.remove(+id);
  }
}
