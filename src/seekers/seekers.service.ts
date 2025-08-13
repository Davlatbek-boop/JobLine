import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeker } from './entities/seeker.entity';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeekersService {
  constructor(
    @InjectRepository(Seeker)
    private readonly seekerRepository: Repository<Seeker>,
  ) {}

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.seekerRepository.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
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
          admin.refresh_token || '',
        );
        if (match) return admin;
      }
  
      return null;
    }

  async create(createSeekerDto: CreateSeekerDto): Promise<Seeker> {
    const seeker = this.seekerRepository.create(createSeekerDto);
    return this.seekerRepository.save(seeker);
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
}
