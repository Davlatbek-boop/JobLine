import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Seeker } from './entities/seeker.entity';

@Controller("seekers")
export class SeekersController {
  constructor(private readonly seekersService: SeekersService) {}

  @ApiOperation({ summary: "CREATE Seeker" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Seeker,
  })
  @Post()
  create(@Body() createSeekerDto: CreateSeekerDto) {
    return this.seekersService.create(createSeekerDto);
  }

  @ApiOperation({ summary: "GET ALL Seekers" })
  @ApiResponse({
    status: 200,
    description: "List of Seekers",
    type: [Seeker],
  })
  @Get()
  findAll() {
    return this.seekersService.findAll();
  }

  @ApiOperation({ summary: "GET One Seeker By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Seeker",
    type: Seeker,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seekersService.findOne(+id);
  }

  @ApiOperation({ summary: "UPDATE Seeker" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update Seeker",
    type: Seeker,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSeekerDto: UpdateSeekerDto) {
    return this.seekersService.update(+id, updateSeekerDto);
  }

  @ApiOperation({ summary: "DELETE Seeker" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete Seeker",
    type: Seeker,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seekersService.remove(+id);
  }
}
