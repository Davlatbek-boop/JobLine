import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
// import { SeekerService } from './seeker.service';
import { CreateSeekerDto } from '../../seekers/dto/create-seeker.dto';
import { UpdateSeekerDto } from '../../seekers/dto/update-seeker.dto';
import { SeekersService } from '../../seekers/seekers.service';

@Controller('seeker')
export class SeekerController {
  constructor(private readonly seekerService: SeekersService) {}

  @Post()
  create(@Body() createSeekerDto: CreateSeekerDto) {
    return this.seekerService.create(createSeekerDto);
  }

  @Get()
  findAll() {
    return this.seekerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seekerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeekerDto: UpdateSeekerDto) {
    return this.seekerService.update(+id, updateSeekerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seekerService.remove(+id);
  }
}
