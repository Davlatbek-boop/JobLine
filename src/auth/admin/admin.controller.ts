import { Body, Controller, Post, Req, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './admin.service';
import { SignInDto } from '../dto/sign-in.dto';

@ApiTags('Admin Authentication')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AdminAuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authAdminService.signInAdmin(signInDto, res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async adminRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authAdminService.refreshTokenAdmin(req, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authAdminService.signOutAdmin(req, res);
  }
}
