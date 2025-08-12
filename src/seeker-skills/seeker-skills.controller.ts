import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeekerSkillsService } from './seeker-skills.service';
import { CreateSeekerSkillDto } from './dto/create-seeker-skill.dto';
import { UpdateSeekerSkillDto } from './dto/update-seeker-skill.dto';

@Controller('seeker-skills')
export class SeekerSkillsController {
  constructor(private readonly seekerSkillsService: SeekerSkillsService) {}

  @Post()
  create(@Body() createSeekerSkillDto: CreateSeekerSkillDto) {
    return this.seekerSkillsService.create(createSeekerSkillDto);
  }

  @Get()
  findAll() {
    return this.seekerSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seekerSkillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeekerSkillDto: UpdateSeekerSkillDto) {
    return this.seekerSkillsService.update(+id, updateSeekerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seekerSkillsService.remove(+id);
  }
}
