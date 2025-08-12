import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeekerSocialLink } from './entities/seeker-social-link.entity';
import { CreateSeekerSocialLinkDto } from './dto/create-seeker-social-link.dto';
import { UpdateSeekerSocialLinkDto } from './dto/update-seeker-social-link.dto';

@Injectable()
export class SeekerSocialLinkService {
  constructor(
    @InjectRepository(SeekerSocialLink)
    private readonly seekerSocialLinkRepository: Repository<SeekerSocialLink>,
  ) {}

  async create(
    createSeekerSocialLinkDto: CreateSeekerSocialLinkDto,
  ): Promise<SeekerSocialLink> {
    const socialLink = this.seekerSocialLinkRepository.create(createSeekerSocialLinkDto);
    return this.seekerSocialLinkRepository.save(socialLink);
  }

  async findAll(): Promise<SeekerSocialLink[]> {
    return this.seekerSocialLinkRepository.find();
  }

  async findOne(id: number): Promise<SeekerSocialLink> {
    const socialLink = await this.seekerSocialLinkRepository.findOne({
      where: { id },
    });
    if (!socialLink) {
      throw new NotFoundException(`SeekerSocialLink #${id} not found`);
    }
    return socialLink;
  }

  async update(
    id: number,
    updateSeekerSocialLinkDto: UpdateSeekerSocialLinkDto,
  ): Promise<SeekerSocialLink> {
    const socialLink = await this.findOne(id);
    const updated = Object.assign(socialLink, updateSeekerSocialLinkDto);
    return this.seekerSocialLinkRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const socialLink = await this.findOne(id);
    await this.seekerSocialLinkRepository.remove(socialLink);
  }
}
