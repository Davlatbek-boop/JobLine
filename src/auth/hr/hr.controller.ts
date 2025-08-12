import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HrService } from '../../hr/hr.service';
import { CreateHrDto } from '../../hr/dto/create-hr.dto';
import { UpdateHrDto } from '../../hr/dto/update-hr.dto';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post()
  create(@Body() createHrDto: CreateHrDto) {
    return this.hrService.create(createHrDto);
  }

  @Get()
  findAll() {
    return this.hrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrDto: UpdateHrDto) {
    return this.hrService.update(+id, updateHrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrService.remove(+id);
  }
}
