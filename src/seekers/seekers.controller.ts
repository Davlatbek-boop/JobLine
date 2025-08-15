import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Seeker } from './entities/seeker.entity';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { SeekerSelfGuard } from '../common/guards/seeker-self.guard';
import { UpdateAdminPasswordDto } from '../admin/dto/update_password';

@Controller('seekers')
export class SeekersController {
  constructor(private readonly seekersService: SeekersService) {}

  @ApiOperation({ summary: 'CREATE Seeker' })
  @ApiResponse({
    status: 200,
    description: 'Activation',
    type: Seeker,
  })
  @Post()
  create(@Body() createSeekerDto: CreateSeekerDto) {
    return this.seekersService.create(createSeekerDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: 'GET ALL Seekers (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'List of Seekers',
    type: [Seeker],
  })
  @Get()
  findAll() {
    return this.seekersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerSelfGuard)
  @ApiOperation({ summary: 'GET One Seeker By Id (Admin/Seeker)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Seeker',
    type: Seeker,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seekersService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerSelfGuard)
  @ApiOperation({ summary: 'UPDATE Seeker (Admin/Seeker)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Update Seeker',
    type: Seeker,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeekerDto: UpdateSeekerDto) {
    return this.seekersService.update(+id, updateSeekerDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: 'DELETE Seeker (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Delete Seeker',
    type: Seeker,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seekersService.remove(+id);
  }

  @Get('activate/:link')
  @ApiOperation({ summary: 'Foydalanuvchini aktivlashtirish' })
  @ApiParam({ name: 'link', type: String })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi aktivlashtirildi' })
  activate(@Param('link') link: string) {
    return this.seekersService.activateSeeker(link);
  }

  @ApiBearerAuth()
  @Patch(':id/password')
  @ApiOperation({ summary: 'Foydalanuvchi parolini yangilash      AdminSelf' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli yangilandi' })
  async updatePassword(
    @Param('id') id: number,
    @Body() dto: UpdateAdminPasswordDto,
  ): Promise<{ message: string }> {
    const result = await this.seekersService.updatePassword(id, dto);
    return { message: result };
  }
}
