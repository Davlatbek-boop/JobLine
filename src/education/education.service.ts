import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    const education = this.educationRepository.create(createEducationDto);
    return this.educationRepository.save(education);
  }

  async findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  async findOne(id: number): Promise<Education> {
    const education = await this.educationRepository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException(`Education #${id} not found`);
    }
    return education;
  }

  async update(
    id: number,
    updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    const education = await this.findOne(id);
    const updated = Object.assign(education, updateEducationDto);
    return this.educationRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const education = await this.findOne(id);
    await this.educationRepository.remove(education);
  }
}
