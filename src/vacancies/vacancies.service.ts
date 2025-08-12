import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepo: Repository<Vacancy>,
  ) {}

  create(createVacancyDto: CreateVacancyDto) {
    return this.vacancyRepo.save(createVacancyDto);
  }

  async findAll(page: number, limit: number) {
    const [vacansies, total] = await this.vacancyRepo.findAndCount({
      relations: ['applications'], //'hr', 'company', 'specialization'
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return {
      success: true,
      total,
      data: vacansies,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.vacancyRepo.findOneBy({ id });
  }

  async update(id: number, updateVacancyDto: UpdateVacancyDto) {
    const one = await this.vacancyRepo.preload({ id, ...updateVacancyDto });
    if (!one) {
      throw new NotFoundException(`Vacancy with ${id} id not found`);
    }

    const res = await this.vacancyRepo.save(one);
    return { ...res, message: 'Application updated successfully' };
  }

  async remove(id: number) {
    const res = await this.vacancyRepo.delete(id);
    return { ...res, message: 'Vacancy deleted successfully' };
  }
}
