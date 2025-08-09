import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkExperience } from './entities/work-experience.entity';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>,
  ) {}

  async create(
    createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    const workExperience = this.workExperienceRepository.create(createWorkExperienceDto);
    return this.workExperienceRepository.save(workExperience);
  }

  async findAll(): Promise<WorkExperience[]> {
    return this.workExperienceRepository.find();
  }

  async findOne(id: number): Promise<WorkExperience> {
    const workExperience = await this.workExperienceRepository.findOne({ where: { id } });
    if (!workExperience) {
      throw new NotFoundException(`WorkExperience #${id} not found`);
    }
    return workExperience;
  }

  async update(
    id: number,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperience> {
    const workExperience = await this.findOne(id);
    const updated = Object.assign(workExperience, updateWorkExperienceDto);
    return this.workExperienceRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const workExperience = await this.findOne(id);
    await this.workExperienceRepository.remove(workExperience);
  }
}
