import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { UpdateAdminPasswordDto } from "./dto/update_password";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";

@ApiBearerAuth("access-token")
@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CreatorGuard)
  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish     Creator" })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli yaratildi.",
    type: Admin,
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CreatorGuard)
  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish     Creator" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha adminni olish     AdminSelf" })
  @ApiParam({ name: "id", description: "Admin ID", type: Number })
  @ApiResponse({ status: 200, description: "Admin topildi", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Adminni yangilash     AdminSelf" })
  @ApiParam({
    name: "id",
    description: "Yangilanadigan admin ID",
    type: Number,
  })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: "Admin yangilandi", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish     Creator" })
  @ApiParam({
    name: "id",
    description: "O'chiriladigan admin ID",
    type: Number,
  })
  @ApiResponse({ status: 200, description: "Admin o'chirildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Patch(":id/password")
  @ApiOperation({ summary: "Foydalanuvchi parolini yangilash      AdminSelf" })
  @ApiParam({ name: "id", type: Number })
  // @ApiBody({ type: UpdateAdminPasswordDto })
  @ApiResponse({ status: 200, description: "Parol muvaffaqiyatli yangilandi" })
  async updatePassword(
    @Param("id") id: number,
    @Body() dto: UpdateAdminPasswordDto
  ): Promise<{ message: string }> {
    const result = await this.adminService.updatePassword(id, dto);
    return { message: result };
  }

  // @Get('activate/:link')
  // @ApiOperation({ summary: 'Foydalanuvchini aktivlashtirish' })
  // @ApiParam({ name: 'link', type: String })
  // @ApiResponse({ status: 200, description: 'Foydalanuvchi aktivlashtirildi' })
  // activate(@Param('link') link: string) {
  //   return this.adminService.activate(link);
  // }
}
