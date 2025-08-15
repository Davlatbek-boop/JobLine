import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Seeker } from "./entities/seeker.entity";
import { CreateSeekerDto } from "./dto/create-seeker.dto";
import { UpdateSeekerDto } from "./dto/update-seeker.dto";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { MailService } from "../mail/mail.service";

@Injectable()
export class SeekersService {
  constructor(
    @InjectRepository(Seeker)
    private readonly seekerRepository: Repository<Seeker>,
    private readonly mailService: MailService
  ) {}

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.seekerRepository.update(id, { hashed_refresh_token });
    return { message: "Refresh token updated successfully" };
  }

  async findSeekerByEmail(email: string) {
    const admin = await this.seekerRepository.findOne({ where: { email } });
    return admin;
  }

  async findSeekerByRefresh(refresh_token: string) {
    const admins = await this.seekerRepository.find();

    for (const admin of admins) {
      const match = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token || ""
      );
      if (match) return admin;
    }

    return null;
  }

  async create(createSeekerDto: CreateSeekerDto) {
  const { password_hash, email, ...otherDto } = createSeekerDto;

  // Email tekshirish
  const existingSeeker = await this.seekerRepository.findOne({ where: { email } });
  if (existingSeeker) {
    throw new BadRequestException('Bunday email allaqachon mavjud!');
  }

  // Parolni hash qilish
  const hashedPassword = await bcrypt.hash(password_hash, 10);

  // Aktivatsiya linki
  const activationLink = uuidv4();

  const newSeeker = await this.seekerRepository.save({
    ...otherDto,
    email,
    password_hash: hashedPassword, // <-- BU joy muhim!
    activate_link: activationLink, // agar DB’da `activate_link` bo‘lsa
  });

  try {
    await this.mailService.sendSeekerMail(newSeeker);
  } catch (error) {
    console.error('Email yuborishda xatolik:', error.message);
    throw new ServiceUnavailableException('Emailga xat yuborishda xatolik');
  }

  return newSeeker;
}

  
  async findAll(): Promise<Seeker[]> {
    return this.seekerRepository.find();
  }

  async findOne(id: number): Promise<Seeker> {
    const seeker = await this.seekerRepository.findOne({ where: { id } });
    if (!seeker) {
      throw new NotFoundException(`Seeker #${id} not found`);
    }
    return seeker;
  }

  async update(id: number, updateSeekerDto: UpdateSeekerDto): Promise<Seeker> {
    const seeker = await this.findOne(id);
    const updated = Object.assign(seeker, updateSeekerDto);
    return this.seekerRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const seeker = await this.findOne(id);
    await this.seekerRepository.remove(seeker);
  }

  async findAdminByActivationLink(link: string): Promise<Seeker | null> {
      return await this.seekerRepository.findOne({ where: {  activate_link: link } });
    }
  
    async activateSeeker(link: string) {
      if (!link) {
        throw new BadRequestException('Activation link jo‘natilmadi!');
      }
      const seeker = await this.seekerRepository.findOne({
        where: {  activate_link: link },
      });
  
      if (!seeker) {
        throw new NotFoundException('Aktivatsiya linki notogri!');
      }
      if (seeker.is_active) {
        throw new BadRequestException('Allaqachon faollashtirilgan');
      }
      seeker.is_active = true;
      seeker. activate_link = '';
  
      await this.seekerRepository.save(seeker);
      return {
        message: 'Profil muvaffaqiyatli faollashtirildi',
        is_active: seeker.is_active,
      };
    }
}
