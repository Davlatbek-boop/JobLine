import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacancySkillDto } from './dto/create-vacancy_skill.dto';
import { UpdateVacancySkillDto } from './dto/update-vacancy_skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancySkill } from './entities/vacancy_skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacancySkillsService {
  constructor(
    @InjectRepository(VacancySkill)
    private readonly vacancySkillRepo: Repository<VacancySkill>,
  ) {}
  create(createVacancySkillDto: CreateVacancySkillDto) {
    return this.vacancySkillRepo.save(createVacancySkillDto);
  }

  async findAll(page: number, limit: number) {
    const [vacansySkills, total] = await this.vacancySkillRepo.findAndCount({
      relations: ['vacancy'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
    return {
      success: true,
      total,
      data: vacansySkills,
      page,
      limit,
    };
  }
  findOne(id: number) {
    return this.vacancySkillRepo.findOneBy({ id });
  }

  async update(id: number, updateVacancySkillDto: UpdateVacancySkillDto) {
    const one = await this.vacancySkillRepo.preload({
      id,
      ...updateVacancySkillDto,
    });
    if (!one) {
      throw new NotFoundException(`Vacancy with ${id} id not found`);
    }

    const res = await this.vacancySkillRepo.save(one);
    return { ...res, message: 'Vacancy skill updated successfully' };
  }

  async remove(id: number) {
    const res = await this.vacancySkillRepo.delete(id);
    return { ...res, message: 'Vacancy skill deleted successfully' };
  }
}
