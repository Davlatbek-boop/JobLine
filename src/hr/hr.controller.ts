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
import { HrService } from "./hr.service";
import { CreateHrDto } from "./dto/create-hr.dto";
import { UpdateHrDto } from "./dto/update-hr.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { Hr } from "./entities/hr.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { HrSelfGuard } from "../common/guards/hr-self.guard";

@Controller("hr")
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @ApiOperation({ summary: "CREATE Hr" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Hr,
  })
  @Post()
  create(@Body() createHrDto: CreateHrDto) {
    return this.hrService.create(createHrDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "GET ALL Employers     Admin" })
  @ApiResponse({
    status: 200,
    description: "List of Empoyers",
    type: [Hr],
  })
  @Get()
  findAll() {
    return this.hrService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrSelfGuard)
  @ApiOperation({ summary: "GET One Hr By Id      admin hr" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "Hr",
    type: Hr,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.hrService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, HrSelfGuard)
  @ApiOperation({ summary: "UPDATE Hr   admin hr" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update Hr",
    type: Hr,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateHrDto: UpdateHrDto) {
    return this.hrService.update(+id, updateHrDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "DELETE Hr       admin" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete Hr",
    type: Hr,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.hrService.remove(+id);
  }
}
