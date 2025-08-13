import { PartialType } from "@nestjs/swagger";
import { CreateSeekerDto } from "../../seekers/dto/create-seeker.dto";

export class UpdateSkillDto extends PartialType(CreateSeekerDto) {}
