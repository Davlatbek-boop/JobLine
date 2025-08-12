import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HrService } from '../../hr/hr.service';
import { JwtService } from '@nestjs/jwt';
import { Hr } from '../../hr/entities/hr.entity';
import { CreateHrDto } from '../../hr/dto/create-hr.dto';
import { SignInDto } from '../dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

@Injectable()
export class HrAuthService {
  constructor(
    private readonly hrService: HrService,
    private readonly jwtService: JwtService,
  ) {}

  async HrGenerateToken(hr: Hr) {
    const payload = {
      id: hr.id,
      role: hr.role,
      is_active: hr.is_active,
      company_id: hr.company_id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signUpHr(createHrDto: CreateHrDto) {
    const candidate = await this.hrService.findHrByEmail(createHrDto.email);
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
    const newHr = await this.hrService.create(createHrDto);
    return { message: "Foydalanuvchi qo'shildi", hrId: newHr.id };
  }

  async signInHr(signInDto: SignInDto, res: Response) {
    const hr = await this.hrService.findHrByEmail(signInDto.email);
    if (!hr) {
      throw new BadRequestException('Email yoki password noto‘g‘ri');
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      hr.password_hash,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Email yoki password noto‘g‘ri');
    }

    const tokens = await this.HrGenerateToken(hr);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      hr.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      await this.hrService.update(hr.id, hr);
    } catch (error) {
      console.log('Token saqlashda xatolik');
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutHr(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    const hr = await this.hrService.findHrByRefresh(refresh_token);

    if (!hr) {
      throw new BadGatewayException('Token yo‘q yoki noto‘g‘ri');
    }
    hr.refresh_token = '';
    await this.hrService.update(hr.id, hr);
    res.clearCookie('refresh_token');

    return { message: 'Tizimdan chiqdingiz' };
  }

  async refreshToken(hrId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);

    if (hrId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }

    const hr = await this.hrService.findOne(hrId);
    if (!hr || !hr.refresh_token) {
      throw new NotFoundException('HR topilmadi');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, hr.refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Token mos emas');
    }

    const { accessToken, refreshToken } = await this.HrGenerateToken(hr);
    hr.refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.hrService.update(hr.id, hr);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: 'Token yangilandi',
      hrId: hr.id,
      access_token: accessToken,
    };
  }
}
