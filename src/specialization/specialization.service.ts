import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Specialization } from "./entities/specialization.entity";
import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationRepo: Repository<Specialization>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async create(createSpecializationDto: CreateSpecializationDto) {
    const { category_id, ...rest } = createSpecializationDto;
    const category = await this.categoryRepo.findOneBy({
      id: category_id,
    });
    if (!category) throw new NotFoundException("Category not found");
    const specialization = this.specializationRepo.create({
      ...rest,
      category,
    });
    return this.specializationRepo.save(specialization);
  }

  findAll() {
    return this.specializationRepo.find({ relations: ["category"] });
  }

  findOne(id: number) {
    return this.specializationRepo.findOne({
      where: { id },
      relations: ["category"],
    });
  }

  async update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    const specialization = await this.specializationRepo.preload({
      id,
      ...updateSpecializationDto,
    });
    if (!specialization) {
      throw new NotFoundException("Specialization not found");
    }
    await this.specializationRepo.save(specialization);
     return this.specializationRepo.findOne({
       where: { id },
       relations: ["category"],
     });
  }

  async remove(id: number) {
    await this.specializationRepo.delete(id);
    return id;
  }
}
