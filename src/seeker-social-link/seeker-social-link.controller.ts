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
import { SeekerSocialLinkService } from "./seeker-social-link.service";
import { CreateSeekerSocialLinkDto } from "./dto/create-seeker-social-link.dto";
import { UpdateSeekerSocialLinkDto } from "./dto/update-seeker-social-link.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { SeekerSocialLink } from "./entities/seeker-social-link.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { SeekerGuard } from "../common/guards/seeker.guard";

@Controller("seeker-social-link")
export class SeekerSocialLinkController {
  constructor(
    private readonly seekerSocialLinkService: SeekerSocialLinkService
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "CREATE SeekerSocialLink" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: SeekerSocialLink,
  })
  @Post()
  create(@Body() createSeekerSocialLinkDto: CreateSeekerSocialLinkDto) {
    return this.seekerSocialLinkService.create(createSeekerSocialLinkDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "GET ALL SeekerSocialLinks" })
  @ApiResponse({
    status: 200,
    description: "List of SeekerSocialLinks",
    type: [SeekerSocialLink],
  })
  @Get()
  findAll() {
    return this.seekerSocialLinkService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "GET One SeekerSocialLink By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "SeekerSocialLink",
    type: SeekerSocialLink,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seekerSocialLinkService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "UPDATE SeekerSocialLink" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update SeekerSocialLink",
    type: SeekerSocialLink,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSeekerSocialLinkDto: UpdateSeekerSocialLinkDto
  ) {
    return this.seekerSocialLinkService.update(+id, updateSeekerSocialLinkDto);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard, SeekerGuard)
  @ApiOperation({ summary: "DELETE SeekerSocialLink" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete SeekerSocialLink",
    type: SeekerSocialLink,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seekerSocialLinkService.remove(+id);
  }
}
