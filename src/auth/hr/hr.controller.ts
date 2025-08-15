import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign-in.dto';
import { CreateHrDto } from '../../hr/dto/create-hr.dto';
import { HrAuthService } from './hr.service';

@ApiTags('HR Authentication')
@Controller('auth/hr')
export class HrAuthController {
  constructor(private readonly hrAuthService: HrAuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createHrDto: CreateHrDto) {
    return this.hrAuthService.signUpHr(createHrDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.hrAuthService.signInHr(signInDto, res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.hrAuthService.refreshTokenHr(req, res);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.hrAuthService.signOutHr(req, res);
  }
}
