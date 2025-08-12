import { SkillType } from "../entities/skill.entity";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillDto {
  @ApiProperty({
    example: "JavaScript",
    description: "Skill nomi",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Frontend development uchun asosiy dasturlash tili",
    description: "Skill haqida qisqacha tavsif",
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 3,
    description: "Ushbu skill tegishli bo‘lgan specialization ID raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  specialization_id: number;

  @ApiProperty({
    example: SkillType.SOFT,
    description: "Skill turi (masalan: HARD yoki SOFT)",
    enum: SkillType,
  })
  @IsEnum(SkillType)
  skill_type: SkillType;

  @ApiProperty({
    example: true,
    description: "Skill faol yoki yo‘qligini belgilaydi",
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
