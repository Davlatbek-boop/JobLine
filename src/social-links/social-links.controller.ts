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
import { SocialLinksService } from "./social-links.service";
import { CreateSocialLinkDto } from "./dto/create-social-link.dto";
import { UpdateSocialLinkDto } from "./dto/update-social-link.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { SocialLink } from "./entities/social-link.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { SeekerSelfGuard } from "../common/guards/seeker-self.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@Controller("social-links")
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "CREATE SocialLink" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: SocialLink,
  })
  @Post()
  create(@Body() createSocialLinkDto: CreateSocialLinkDto) {
    return this.socialLinksService.create(createSocialLinkDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "GET ALL SocialLinks" })
  @ApiResponse({
    status: 200,
    description: "List of SocialLinks",
    type: [SocialLink],
  })
  @Get()
  findAll() {
    return this.socialLinksService.findAll();
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "GET One SocialLink By Id" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: "SocialLink",
    type: SocialLink,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.socialLinksService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "UPDATE SocialLink" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Update SocialLink",
    type: SocialLink,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSocialLinkDto: UpdateSocialLinkDto
  ) {
    return this.socialLinksService.update(+id, updateSocialLinkDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "DELETE SocialLink" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Delete SocialLink",
    type: SocialLink,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.socialLinksService.remove(+id);
  }
}
