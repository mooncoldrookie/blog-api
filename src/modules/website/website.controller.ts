import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common'
import { WebsiteService } from './website.service'
import { PostsByCategoryDto, PostsByTagDto, SearchPostsDto } from './website.dto'
import { PaginationQueryDto } from '../../common/request/general'

@Controller('blog')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get('homePosts')
  async getHomePosts() {
    return this.websiteService.getHomePosts()
  }

  @Get('recommendedPosts')
  async getRecommendedPosts() {
    return this.websiteService.getRecommendedPosts()
  }

  @Get('posts')
  async getPosts(@Query() dto: PaginationQueryDto) {
    return this.websiteService.getPosts(dto)
  }

  @Get('tags')
  async getTags() {
    return this.websiteService.getTags()
  }

  @Get('categories')
  async getCategories() {
    return this.websiteService.getTags()
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: number) {
    return this.websiteService.getPostById(id)
  }

  @Get('posts/category')
  async getPostsByCategory(@Query() dto: PostsByCategoryDto) {
    return this.websiteService.getPostsByCategory(dto)
  }

  @Get('posts/tag')
  async getPostsByTag(@Query() dto: PostsByTagDto) {
    return this.websiteService.getPostsByTag(dto)
  }

  @Get('posts/search')
  async searchPosts(@Query() dto: SearchPostsDto) {
    return this.websiteService.searchPosts(dto.keyword)
  }
}
