import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeekerSocialLinkService } from './seeker-social-link.service';
import { CreateSeekerSocialLinkDto } from './dto/create-seeker-social-link.dto';
import { UpdateSeekerSocialLinkDto } from './dto/update-seeker-social-link.dto';

@Controller('seeker-social-link')
export class SeekerSocialLinkController {
  constructor(private readonly seekerSocialLinkService: SeekerSocialLinkService) {}

  @Post()
  create(@Body() createSeekerSocialLinkDto: CreateSeekerSocialLinkDto) {
    return this.seekerSocialLinkService.create(createSeekerSocialLinkDto);
  }

  @Get()
  findAll() {
    return this.seekerSocialLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seekerSocialLinkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeekerSocialLinkDto: UpdateSeekerSocialLinkDto) {
    return this.seekerSocialLinkService.update(+id, updateSeekerSocialLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seekerSocialLinkService.remove(+id);
  }
}
