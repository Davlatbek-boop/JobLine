import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hr } from './entities/hr.entity';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { UpdateHrPasswordDto } from './dto/update-password';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(Hr) private readonly hrRepo: Repository<Hr>,
    private readonly mailService: MailService,
  ) {}

  async create(createHrDto: CreateHrDto) {
    const { password, email, ...otherDto } = createHrDto;

    const existingHr = await this.hrRepo.findOne({ where: { email } });
    if (existingHr) {
      throw new BadRequestException('Bunday email allaqachon mavjud!');
    }

    const password_hash = await bcrypt.hash(password, 7);

    const activationLink = uuidv4();

    const newHr = await this.hrRepo.save({
      ...otherDto,
      email,
      password_hash,
      active_link: activationLink,
    });

    try {
      await this.mailService.sendHrMail(newHr);
    } catch (error) {
      console.error('Email yuborishda xatolik:', error.message);
      throw new ServiceUnavailableException('Emailga xat yuborishda xatolik');
    }
    return newHr;
  }

  findAll() {
    return this.hrRepo.find({});
  }

  async findHrByEmail(email: string) {
    return await this.hrRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.hrRepo.findOne({ where: { id } });
  }

  async update(id: number, updateHrDto: UpdateHrDto) {
    const hrUpdate = await this.hrRepo.preload({ id, ...updateHrDto });
    if (!hrUpdate) {
      throw new NotFoundException(`HR with id ${id} not found`);
    }
    return this.hrRepo.save(hrUpdate);
  }

  remove(id: number) {
    return this.hrRepo.delete(id);
  }

  async save(hr: Hr) {
    return this.hrRepo.save(hr);
  }

  async findHrByRefresh(refresh_token: string) {
    const hrs = await this.hrRepo.find();
    for (const hr of hrs) {
      const match = await bcrypt.compare(
        refresh_token,
        hr.hashed_refresh_token || '',
      );
      if (match) return hr;
    }
    return null;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.hrRepo.update(id, { hashed_refresh_token });
    return { message: 'Refresh token updated successfully' };
  }

  async clearRefreshToken(adminId: number) {
    await this.hrRepo.update(adminId, {
      hashed_refresh_token: '',
    });
  }

  async findAdminByActivationLink(link: string): Promise<Hr | null> {
    return await this.hrRepo.findOne({ where: { active_link: link } });
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link jo‘natilmadi!');
    }
    const hr = await this.hrRepo.findOne({
      where: { active_link: link },
    });

    if (!hr) {
      throw new NotFoundException('Aktivatsiya linki notogri!');
    }
    if (hr.is_active) {
      throw new BadRequestException('Allaqachon faollashtirilgan');
    }
    hr.is_active = true;
    hr.active_link = '';

    await this.hrRepo.save(hr);
    return {
      message: 'Profil muvaffaqiyatli faollashtirildi',
      is_active: hr.is_active,
    };
  }

  async updatePassword(id: number, dto: UpdateHrPasswordDto): Promise<string> {
    const hr = await this.hrRepo.findOne({ where: { id } });

    if (!hr) throw new NotFoundException('Foydalanuvchi topilmadi');

    const isMatch = await bcrypt.compare(dto.oldpassword, hr.password_hash);
    if (!isMatch) throw new BadRequestException("Eski parol noto'g'ri");

    if (dto.newpassword !== dto.confirm_password) {
      throw new BadRequestException(
        'Yangi parol va tasdiqlash paroli mos emas',
      );
    }

    const hashedNewPassword = await bcrypt.hash(dto.newpassword, 7);
    hr.password_hash = hashedNewPassword;

    await this.hrRepo.save(hr);

    return 'Parol muvaffaqiyatli yangilandi';
  }
}
