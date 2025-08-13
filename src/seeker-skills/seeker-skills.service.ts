import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeekerSkill } from './entities/seeker-skill.entity';
import { CreateSeekerSkillDto } from './dto/create-seeker-skill.dto';
import { UpdateSeekerSkillDto } from './dto/update-seeker-skill.dto';

@Injectable()
export class SeekerSkillsService {
  constructor(
    @InjectRepository(SeekerSkill)
    private readonly seekerSkillRepository: Repository<SeekerSkill>,
  ) {}

  async create(
    createSeekerSkillDto: CreateSeekerSkillDto,
  ): Promise<SeekerSkill> {
    const seekerSkill = this.seekerSkillRepository.create(createSeekerSkillDto);
    return this.seekerSkillRepository.save(seekerSkill);
  }

  async findAll(): Promise<SeekerSkill[]> {
    return this.seekerSkillRepository.find();
  }

  async findOne(id: number): Promise<SeekerSkill> {
    const seekerSkill = await this.seekerSkillRepository.findOne({ where: { id } });
    if (!seekerSkill) {
      throw new NotFoundException(`SeekerSkill #${id} not found`);
    }
    return seekerSkill;
  }

  async update(
    id: number,
    updateSeekerSkillDto: UpdateSeekerSkillDto,
  ): Promise<SeekerSkill> {
    const seekerSkill = await this.findOne(id);
    const updated = Object.assign(seekerSkill, updateSeekerSkillDto);
    return this.seekerSkillRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const seekerSkill = await this.findOne(id);
    await this.seekerSkillRepository.remove(seekerSkill);
  }
}
