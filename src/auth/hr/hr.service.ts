import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  async generateHrTokens(hr: Hr) {
    const payload = {
      id: hr.id,
      email: hr.email,
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
      throw new BadRequestException('Email yoki parol noto‘g‘ri');
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      hr.password_hash,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Email yoki parol noto‘g‘ri');
    }

    const tokens = await this.generateHrTokens(hr);
    res.cookie('hashed_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    try {
      const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 7);
      hr.hashed_refresh_token = hashedRefresh;
      await this.hrService.update(hr.id, hr);
    } catch (error) {
      console.error('Refresh token saqlashda xatolik:', error);
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutHr(req: Request, res: Response) {
    const cookieRefresh = req.cookies['hashed_refresh_token'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(cookieRefresh, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (err) {
      throw new UnauthorizedException(
        'Refresh token yaroqsiz yoki muddati tugagan',
      );
    }

    const hr = await this.hrService.findHrByEmail(payload.email);

    if (
      !hr ||
      !(await bcrypt.compare(cookieRefresh, hr.hashed_refresh_token))
    ) {
      throw new BadRequestException(
        'Bunday refresh tokenli HR topilmadi yoki token mos emas',
      );
    }

    await this.hrService.clearRefreshToken(hr.id);
    res.clearCookie('hashed_refresh_token', { httpOnly: true, secure: true });

    return { message: 'HR tizimdan chiqdi' };
  }

  async refreshTokenHr(req: Request, res: Response) {
    const cookieRefresh = req.cookies['hashed_refresh_token'];
    if (!cookieRefresh) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(cookieRefresh, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new ForbiddenException(
        'Refresh token yaroqsiz yoki muddati tugagan',
      );
    }

    const hr = await this.hrService.findHrByEmail(payload.email);
    if (!hr) {
      throw new NotFoundException('HR topilmadi');
    }

    const isMatch = await bcrypt.compare(
      cookieRefresh,
      hr.hashed_refresh_token,
    );
    if (!isMatch) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.generateHrTokens(hr);
    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 7);
    await this.hrService.updateRefreshToken(hr.id, hashedRefresh);

    res.cookie('hashed_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    return {
      message: 'Token yangilandi',
      accessToken: tokens.accessToken,
    };
  }
}
