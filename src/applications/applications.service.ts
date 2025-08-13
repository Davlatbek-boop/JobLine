import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Application } from "./entities/application.entity";

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>
  ) {}
  create(createApplicationDto: CreateApplicationDto) {
    return this.applicationRepo.save(createApplicationDto);
  }

  async findAll(page: number, limit: number) {
    const [applications, total] = await this.applicationRepo.findAndCount({
      relations: ["vacancy"], //'hr', 'company', 'specialization'
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
    });
    return {
      success: true,
      total,
      data: applications,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.applicationRepo.findOne({ where: { id },  relations: ['vacancy'], });
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const one = await this.applicationRepo.preload({
      id,
      ...updateApplicationDto,
    });
    if (!one) {
      throw new NotFoundException(`Application with ${id} id not found`);
    }

    const res = await this.applicationRepo.save(one);
    return { ...res, message: "Application updated successfully" };
  }

  async remove(id: number) {
    const res = await this.applicationRepo.delete(id);
    return { ...res, message: "Application deleted successfully" };
  }

  // All applications for a vacancy (optional status + pagination)
  async getApplicationsByVacancy(
    vacancyId: number,
    status?: string,
    page = 1,
    limit = 10
  ) {
    const [items, total] = await this.applicationRepo.findAndCount({
      where: {
        vacancy: { id: vacancyId },
        ...(status && { status }), // optional filter
      },
      relations: ["vacancy"],
      order: { applied_at: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { success: true, total, page, limit, data: items };
  }

  // Filter applications by status with pagination
  async filterApplications(status: string, page = 1, limit = 10) {
    const [items, total] = await this.applicationRepo.findAndCount({
      where: { status },
      relations: ["vacancy"],
      order: { applied_at: "DESC" as any },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { success: true, total, page, limit, data: items };
  }
}
