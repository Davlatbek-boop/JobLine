import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../admin/entities/admin.entity';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AdminService } from '../../admin/admin.service';
import { SignInDto } from '../dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async AdmingenerateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
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
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email,
    );
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: "Foydalanuvchi qo'shildi", adminId: newAdmin.id };
  }

  async signInAdmin(singInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(singInDto.email);

    if (!admin) {
      throw new BadRequestException('Email yoki passwor hato');
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      admin.password_hash,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Email yoki passwor hato');
    }
    const tokens = await this.AdmingenerateToken(admin);
    res.cookie('hashed_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      admin.hashed_refresh_token = hashed_refresh_token;
      await this.adminService.update(admin.id, admin);
    } catch (error) {
      console.log('Token da xatolik !?!');
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutAdmin(req: Request, res: Response) {
    const cookieRefresh = req.cookies['hashed_refresh_token'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(cookieRefresh, {
        secret: process.env.REFRESH_TOKEN_KEY, // .env ichida bo‘lishi kerak
      });
    } catch (err) {
      throw new UnauthorizedException(
        'Refresh token yaroqsiz yoki muddati tugagan',
      );
    }

    const admin = await this.adminService.findAdminByEmail(payload.email);

    if (
      !admin ||
      !(await bcrypt.compare(cookieRefresh, admin.hashed_refresh_token))
    ) {
      throw new BadRequestException(
        'Bunday refresh tokenli admin topilmadi yoki token mos emas',
      );
    }

    await this.adminService.clearRefreshToken(admin.id);

    res.clearCookie('hashed_refresh_token', { httpOnly: true, secure: true });

    return { message: 'Admin logout' };
  }

  async refreshTokenAdmin(req: Request, res: Response) {
    const admin_refresh_token = req.cookies['hashed_refresh_token'];
    if (!admin_refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(admin_refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new ForbiddenException(
        'Refresh token yaroqsiz yoki muddati tugagan',
      );
    }

    const admin = await this.adminService.findAdminByEmail(payload.email);
    if (!admin) {
      throw new ForbiddenException('Bunday foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(
      admin_refresh_token,
      admin.hashed_refresh_token,
    );
    if (!isMatch) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.AdmingenerateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie('hashed_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token o'zgardi",
      accessToken: tokens.accessToken,
    };
  }
}
