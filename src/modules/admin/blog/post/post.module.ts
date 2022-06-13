import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../../../../entities/blog/post.entity'
import { PostService } from './post.service'
import { CategoryModule } from '../category/category.module'
import { TagModule } from '../tag/tag.module'

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoryModule, TagModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
