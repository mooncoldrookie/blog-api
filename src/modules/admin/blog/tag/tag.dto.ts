import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { ApiProperty, OmitType } from '@nestjs/swagger'

export class TagClass {
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

export class CreateTagDto extends OmitType(TagClass, ['id']) {}

export class UpdateTagDto extends CreateTagDto {}

export class BatchDeleteDto {
  @ApiProperty({ description: '要删除的项目的id数组' })
  @IsArray({ message: 'ids应该是number array' })
  ids: number[]
}
