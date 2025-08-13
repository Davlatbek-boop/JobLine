import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { SeekerSkillsService } from "./seeker-skills.service";
import { CreateSeekerSkillDto } from "./dto/create-seeker-skill.dto";
import { UpdateSeekerSkillDto } from "./dto/update-seeker-skill.dto";

@ApiTags("Seeker Skills") // Swagger UI'da kategoriya nomi
@Controller("seeker-skills")
export class SeekerSkillsController {
  constructor(private readonly seekerSkillsService: SeekerSkillsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi seeker skill qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Seeker skill muvaffaqiyatli qo‘shildi",
  })
  create(@Body() createSeekerSkillDto: CreateSeekerSkillDto) {
    return this.seekerSkillsService.create(createSeekerSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha seeker skill’larni olish" })
  @ApiResponse({ status: 200, description: "Seeker skill ro‘yxati" })
  findAll() {
    return this.seekerSkillsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta seeker skill ma’lumotini olish" })
  @ApiParam({ name: "id", description: "Seeker skill ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Topilgan seeker skill" })
  @ApiResponse({ status: 404, description: "Seeker skill topilmadi" })
  findOne(@Param("id") id: string) {
    return this.seekerSkillsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Seeker skill ma’lumotini yangilash" })
  @ApiParam({ name: "id", description: "Seeker skill ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Seeker skill yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateSeekerSkillDto: UpdateSeekerSkillDto
  ) {
    return this.seekerSkillsService.update(+id, updateSeekerSkillDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Seeker skillni o‘chirish" })
  @ApiParam({ name: "id", description: "Seeker skill ID raqami", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Seeker skill muvaffaqiyatli o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.seekerSkillsService.remove(+id);
  }
}
