import { Module } from '@nestjs/common';
import { CategoryModule } from "./category/category.module";
import { PostModule } from "./post/post.module";
import { TagModule } from "./tag/tag.module";

@Module({
  imports:[
    CategoryModule,
    PostModule,
    TagModule
  ]
})
export class BlogModule {}
