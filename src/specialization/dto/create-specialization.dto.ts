import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateSpecializationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsNumber()
  active_vacancies_count: number;
  @IsNumber()
  category_id: number;
  @IsOptional()
  @IsNumber()
  sort_order: number;
  @IsBoolean()
  is_active: boolean;
}
