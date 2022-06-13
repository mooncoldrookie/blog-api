import { Tag } from '../../../../entities/blog/tag.entity'
import { Category } from '../../../../entities/blog/category.entity'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Column } from 'typeorm'
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

export class PostClass {
  id: number

  author: string

  title: string

  summary: string

  cover: string

  status: number

  top: boolean

  publishDate: Date

  views: number

  comments: number

  content: string

  contentHtml: string

  tags: Tag[]

  category: Category
}

export class CreatePostDto {
  @ApiProperty({ description: '作者' })
  @IsString()
  author: string

  @ApiProperty({ description: '标题' })
  @IsString()
  title: string

  @ApiProperty({ description: '封面图片' })
  @IsString()
  @IsOptional()
  cover: string

  @ApiProperty({ description: '文章状态 0：未发布 1：发布' })
  @IsNumber()
  status: number

  @ApiProperty({ description: '是否置顶' })
  @IsBoolean()
  top: boolean

  @ApiProperty({ description: '文章内容' })
  @IsString()
  content: string

  @ApiProperty({ description: '文章内容html' })
  @IsString()
  contentHtml: string

  @ApiProperty({ description: '标签名数组' })
  @IsArray()
  @IsOptional()
  tags: string[]

  @ApiProperty({ description: '分类名' })
  @IsString()
  category: string
}

export class UpdatePostDto extends CreatePostDto {}

export class SetTopDto extends PickType(UpdatePostDto, ['top']) {
  @IsPositive()
  id: number
}

export class SetStatusDto extends PickType(UpdatePostDto, ['status']) {
  @IsPositive()
  id: number
}
