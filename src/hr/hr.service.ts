import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hr } from './entities/hr.entity';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(Hr) private readonly hrRepo: Repository<Hr>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createHrDto: CreateHrDto) {
    const { password, email, ...otherDto } = createHrDto;

    // if (password !== confirm_password) {
    //   throw new BadRequestException('Parollar mos emas!');
    // }

    const existingHr = await this.hrRepo.findOne({ where: { email } });
    if (existingHr) {
      throw new BadRequestException('Bunday email allaqachon mavjud!');
    }

    const password_hash = await bcrypt.hash(password, 7);

    const newHr = await this.hrRepo.save({
      ...otherDto,
      email,
      password_hash,
      refresh_token: '',
    });

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
}
