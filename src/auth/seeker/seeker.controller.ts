import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign-in.dto';
import { CreateSeekerDto } from '../../seekers/dto/create-seeker.dto';
import { SeekerAuthService } from './seeker.service';

@ApiTags('Seeker Authentication')
@Controller('auth/seeker')
export class AuthSeekerController {
  constructor(private readonly authSeekerService: SeekerAuthService) {}

  @Post('signup')
  async signUp(@Body() createSeekerDto: CreateSeekerDto) {
    return this.authSeekerService.signUp(createSeekerDto);
  }

  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSeekerService.signIn(signInDto, res);
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSeekerService.refreshToken(req, res);
  }

  @Post('signout')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authSeekerService.signOut(req, res);
  }
}
