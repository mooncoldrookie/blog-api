import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from '../../entities/blog/post.entity'
import { ILike, Repository } from 'typeorm'
import { PostService } from '../admin/blog/post/post.service'
import { TagService } from '../admin/blog/tag/tag.service'
import { Tag } from '../../entities/blog/tag.entity'
import { PostsByCategoryDto, PostsByTagDto } from './website.dto'
import { PaginationQueryDto } from '../../common/request/general'
import { Category } from '../../entities/blog/category.entity'

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly postService: PostService,
    private readonly tagService: TagService,
  ) {}

  async getHomePosts() {
    return await this.postRepository.find({ take: 10, where: { status: 1 } })
  }

  async getRecommendedPosts() {
    return await this.postRepository.find({
      order: {
        views: 'DESC',
      },
      where: {
        status: 1,
      },
      select: {
        id: true,
        title: true,
      },
      skip: 0,
      take: 5,
    })
  }

  async getTags() {
    return await this.tagService.findAll()
  }

  async getCategories() {
    return await this.categoryRepository.find()
  }

  /**
   * 博客详情页 阅读量+1
   * @param id
   */
  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id, status: 1 },
      relations: { tags: true, category: true },
    })
    if (!post) {
      throw new NotFoundException()
    }
    await this.postRepository.update(id, { views: post.views + 1 })
    return post
  }

  async getPosts(dto: PaginationQueryDto) {
    const { offset, limit } = dto
    const list = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      where: {
        status: 1,
      },
      skip: offset,
      take: limit,
    })
    const total = await this.postRepository.count({
      where: {
        status: 1,
      },
    })
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      total,
      page,
      size: limit,
      list,
    }
  }

  async getPostsByCategory(dto: PostsByCategoryDto) {
    const { offset, limit, categoryId } = dto

    const category = await this.categoryRepository.findOneBy({ id: categoryId })
    if (!category) {
      throw new NotFoundException()
    }

    const list = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      where: {
        status: 1,
        category: {
          id: categoryId,
        },
      },
      skip: offset,
      take: limit,
    })
    const total = await this.postRepository.count({
      where: {
        status: 1,
        category: {
          id: categoryId,
        },
      },
    })
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      category,
      total,
      page,
      size: limit,
      list,
    }
  }

  async getPostsByTag(dto: PostsByTagDto) {
    const { offset, limit, tagId } = dto

    const tag = await this.tagRepository.findOneBy({ id: tagId })
    if (!tag) {
      throw new NotFoundException()
    }

    const list = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      where: {
        status: 1,
        tags: {
          id: tagId,
        },
      },
      skip: offset,
      take: limit,
    })
    const total = await this.postRepository.count({
      where: {
        status: 1,
        tags: {
          id: tagId,
        },
      },
    })
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      tag,
      total,
      page,
      size: limit,
      list,
    }
  }

  // 根据标题模糊查询
  async searchPosts(keyword: string) {
    return await this.postRepository.findBy({
      title: ILike(`%${keyword}%`),
      status: 1,
    })
  }
}
