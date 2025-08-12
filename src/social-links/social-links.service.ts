import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialLink } from './entities/social-link.entity';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLink)
    private readonly socialLinkRepository: Repository<SocialLink>,
  ) {}

  async create(createSocialLinkDto: CreateSocialLinkDto): Promise<SocialLink> {
    const newLink = this.socialLinkRepository.create(createSocialLinkDto);
    return this.socialLinkRepository.save(newLink);
  }

  async findAll(): Promise<SocialLink[]> {
    return this.socialLinkRepository.find();
  }

  async findOne(id: number): Promise<SocialLink> {
    const link = await this.socialLinkRepository.findOne({ where: { id } });
    if (!link) {
      throw new NotFoundException(`SocialLink #${id} not found`);
    }
    return link;
  }

  async update(id: number, updateSocialLinkDto: UpdateSocialLinkDto): Promise<SocialLink> {
    const link = await this.findOne(id);
    const updated = Object.assign(link, updateSocialLinkDto);
    return this.socialLinkRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const link = await this.findOne(id);
    await this.socialLinkRepository.remove(link);
  }
}
