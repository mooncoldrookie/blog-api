import { Module } from '@nestjs/common'
import { WebsiteController } from './website.controller'
import { WebsiteService } from './website.service'
import { CategoryModule } from '../admin/blog/category/category.module'
import { TagModule } from '../admin/blog/tag/tag.module'
import { PostModule } from '../admin/blog/post/post.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../../entities/blog/post.entity'
import { Tag } from '../../entities/blog/tag.entity'
import { Category } from '../../entities/blog/category.entity'

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forFeature([Post, Tag, Category]),
    CategoryModule,
    TagModule,
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
