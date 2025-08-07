import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "./entities/skill.entity";
import { Repository } from "typeorm";
import { Specialization } from "../specialization/entities/specialization.entity";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
    @InjectRepository(Specialization)
    private readonly specializationRepo: Repository<Specialization>
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const { specialization_id, ...rest } = createSkillDto;
    const specialization = await this.specializationRepo.findOneBy({
      id: specialization_id,
    });
    if (!specialization)
      throw new NotFoundException("Specialization not found");
    const skill = this.skillRepo.create({
      ...rest,
      specialization,
    });
    return this.skillRepo.save(skill);
  }

  findAll() {
    return this.skillRepo.find({ relations: ["specialization"] });
  }

  findOne(id: number) {
    return this.skillRepo.findOne({
      where: { id },
      relations: ["specialization"],
    });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepo.preload({
      id,
      ...updateSkillDto,
    });
    if (!skill) {
      throw new NotFoundException("Skill not found");
    }
    await this.skillRepo.save(skill);
    return this.skillRepo.findOne({
      where: { id },
      relations: ["specialization"],
    });
  }

  async remove(id: number) {
    await this.skillRepo.delete(id);
    return id;
  }
}
