import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/sign-in.dto';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { SeekersService } from '../../seekers/seekers.service';
import { Seeker } from '../../seekers/entities/seeker.entity';
import { CreateSeekerDto } from '../../seekers/dto/create-seeker.dto';

@Injectable()
export class SeekerAuthService {
  constructor(
    private readonly seekerService: SeekersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateTokens(seeker: Seeker) {
    const payload = {
      id: seeker.id,
      email: seeker.email,
      is_active: seeker.is_active,
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

  async signUp(createSeekerDto: CreateSeekerDto) {
    const candidate = await this.seekerService.findSeekerByEmail(
      createSeekerDto.email,
    );
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }

    const hashedPassword = await bcrypt.hash(createSeekerDto.password_hash, 7);
    createSeekerDto.password_hash = hashedPassword;

    const newSeeker = await this.seekerService.create(createSeekerDto);
    return { message: "Foydalanuvchi qo'shildi", seekerId: newSeeker.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const seeker = await this.seekerService.findSeekerByEmail(signInDto.email);
    if (!seeker) {
      throw new BadRequestException('Email yoki parol noto‘g‘ri');
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      seeker.password_hash,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Email yoki parol noto‘g‘ri');
    }

    const tokens = await this.generateTokens(seeker);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    await this.seekerService.updateRefreshToken(seeker.id, hashedRefreshToken);

    res.cookie('heshed_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: 'Tizimga xush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOut(req: Request, res: Response) {
    const refreshToken = req.cookies['heshed_refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException('Token yaroqsiz yoki muddati tugagan');
    }

    const seeker = await this.seekerService.findSeekerByEmail(payload.email);
    if (!seeker) {
      throw new BadRequestException('Bunday foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(
      refreshToken,
      seeker.hashed_refresh_token,
    );
    if (!isMatch) {
      throw new ForbiddenException('Token mos emas');
    }

    await this.seekerService.updateRefreshToken(seeker.id, '');

    res.clearCookie('heshed_refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return { message: 'Siz tizimdan chiqdingiz' };
  }

  async refreshToken(req: Request, res: Response) {
    const oldRefreshToken = req.cookies['heshed_refresh_token'];
    if (!oldRefreshToken) {
      throw new ForbiddenException('Refresh token topilmadi');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(oldRefreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new ForbiddenException('Token noto‘g‘ri yoki muddati tugagan');
    }

    const seeker = await this.seekerService.findSeekerByEmail(payload.email);
    if (!seeker) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(
      oldRefreshToken,
      seeker.hashed_refresh_token,
    );
    if (!isMatch) {
      throw new ForbiddenException('Token mos emas');
    }

    const tokens = await this.generateTokens(seeker);
    const newHashedRefresh = await bcrypt.hash(tokens.refreshToken, 7);
    await this.seekerService.updateRefreshToken(seeker.id, newHashedRefresh);

    res.cookie('heshed_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: 'Token yangilandi',
      accessToken: tokens.accessToken,
    };
  }
}
