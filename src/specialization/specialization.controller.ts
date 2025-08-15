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
import { SpecializationService } from "./specialization.service";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Specialization } from "./entities/specialization.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@Controller("specialization")
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "CREATE Specialization" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Specialization,
  })
  @Post()
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "GET ALL Specializations" })
  @ApiResponse({
    status: 200,
    description: "List of Specializations",
    type: [Specialization],
  })
  @Get()
  findAll() {
    return this.specializationService.findAll();
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "GET One Specialization By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Specialization",
    type: Specialization,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.specializationService.findOne(+id);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "UPDATE Specialization" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update Specialization",
    type: Specialization,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto
  ) {
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "DELETE Specialization" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete Specialization",
    type: Specialization,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.specializationService.remove(+id);
  }
}
