import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginationQueryDto } from '../../common/request/general'

export class PostsByCategoryDto extends PaginationQueryDto {
  @ApiProperty({ description: 'category id' })
  @IsNumber()
  @IsOptional()
  categoryId: number
}

export class PostsByTagDto extends PaginationQueryDto {
  @ApiProperty({ description: 'category id' })
  @IsNumber()
  @IsOptional()
  tagId: number
}

export class SearchPostsDto {
  @ApiProperty({ description: '标题关键词' })
  @IsString()
  keyword: string
}
