import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { ApiProperty, OmitType } from '@nestjs/swagger'

export class CategoryClass {
  @ApiProperty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  alias: string
}

export class CreateCategoryDto extends OmitType(CategoryClass, ['id']) {}

export class UpdateCategoryDto extends CreateCategoryDto {}

export class BatchDeleteDto {
  @ApiProperty({ description: '要删除的项目的id数组' })
  @IsArray({ message: 'ids应该是number array' })
  ids: number[]
}
