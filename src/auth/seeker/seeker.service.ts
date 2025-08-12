import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { SeekerService } from '../seeker.service';
// import { CreateSeekerDto } from '../dto/create-seeker.dto';
import { SignInDto } from '../dto/sign-in.dto';
// import { Seeker } from '../entities/seeker.entity';
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

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: 'Tizimga xush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException('Refresh token topilmadi');
    }

    const seeker = await this.seekerService.findSeekerByRefresh(refresh_token);
    if (!seeker) {
      throw new BadRequestException('Token noto‘g‘ri');
    }

    await this.seekerService.updateRefreshToken(seeker.id, ''); // Bu yerda null bor edi
    res.clearCookie('refresh_token');

    return { message: 'Siz tizimdan chiqdingiz' };
  }

  async refreshToken(seekerId: number, refresh_token: string, res: Response) {
    const decoded = this.jwtService.decode(refresh_token) as any;

    if (decoded.id !== seekerId) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }

    const seeker = await this.seekerService.findOne(seekerId);
    if (!seeker || !seeker.refresh_token) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(refresh_token, seeker.refresh_token);
    if (!isMatch) {
      throw new ForbiddenException('Token mos emas');
    }

    const tokens = await this.generateTokens(seeker);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    await this.seekerService.updateRefreshToken(seeker.id, hashedRefreshToken);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: 'Token yangilandi',
      accessToken: tokens.accessToken,
    };
  }
}
