import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from '../../../../entities/blog/post.entity'
import { CreatePostDto, SetStatusDto, SetTopDto, UpdatePostDto } from './post.dto'
import { CategoryService } from '../category/category.service'
import { TagService } from '../tag/tag.service'
import { ApiException } from '../../../../common/filter/api-exception'
import { PaginationQueryDto } from '../../../../common/request/general'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async findOne(id: number) {
    const exist = await this.postRepository.findOne({
      where: { id },
      relations: { tags: true, category: true },
    })
    if (!exist) {
      throw new ApiException(15000)
    }
    return exist
  }

  // 用于编辑文章时直接获取文章、分类和标签的聚合数据
  async getEditPostData(id: number) {
    const post = await this.findOne(id)
    const categoryList = await this.categoryService.findAll()
    const tagList = await this.tagService.findAll()
    return {
      post,
      categoryList,
      tagList,
    }
  }

  async find({ offset, limit }: PaginationQueryDto) {
    const list = await this.postRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'DESC',
      },
      relations: {
        tags: true,
        category: true,
      },
      select: {
        id: true,
        title: true,
        author: true,
        summary: true,
        cover: true,
        status: true,
        top: true,
        publishDate: true,
        views: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    const total = await this.postRepository.count()
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      list,
      total: total,
      size: limit,
      page,
    }
  }

  async create(dto: CreatePostDto) {
    const category = await this.categoryService.findOneByName(dto.category)
    if (!category) {
      throw new ApiException(13000)
    }
    const tags = []
    if (dto.tags) {
      for (const name of dto.tags) {
        const tag = await this.tagService.findOneByName(name)
        if (!tag) {
          throw new ApiException(13000)
        }
        tags.push(tag)
      }
    }
    const post = new Post()

    post.category = category
    post.tags = tags
    post.title = dto.title
    post.author = dto.author
    post.content = dto.content
    post.contentHtml = dto.contentHtml
    post.top = dto.top
    post.cover = dto.cover
    post.status = dto.status
    if (dto.status === 1) {
      post.publishDate = new Date()
    }

    return await this.postRepository.save(post)
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.findOne(id)
    const category = await this.categoryService.findOneByName(dto.category)
    if (!category) {
      throw new ApiException(13000)
    }
    const tags = []
    if (dto.tags) {
      for (const name of dto.tags) {
        const tag = await this.tagService.findOneByName(name)
        if (!tag) {
          throw new ApiException(13000)
        }
        tags.push(tag)
      }
    }
    const post = new Post()
    post.id = id
    post.category = category
    post.tags = tags
    post.title = dto.title
    post.author = dto.author
    post.content = dto.content
    post.contentHtml = dto.contentHtml
    post.top = dto.top
    post.cover = dto.cover
    post.status = dto.status
    const publishDate = await this.postRepository.findOne({
      where: { id },
      select: { publishDate: true },
    })
    if (dto.status === 1 && !publishDate) {
      post.publishDate = new Date()
    }
    return await this.postRepository.save(post)
  }

  async delete(id: number) {
    await this.findOne(id)
    await this.postRepository.delete(id)
  }

  // 设置置顶
  async setTop(dto: SetTopDto) {
    await this.findOne(dto.id)
    await this.postRepository.update(dto.id, { top: dto.top })
    return await this.postRepository.findOne({
      where: { id: dto.id },
      select: { top: true },
    })
  }

  // 设置发布
  async setStatus(dto: SetStatusDto) {
    const post = await this.findOne(dto.id)
    const publishDate = await this.postRepository.findOne({
      where: { id: dto.id },
      select: { publishDate: true },
    })
    if (dto.status === 1 && !publishDate) {
      post.publishDate = new Date()
    }
    await this.postRepository.update(dto.id, { status: dto.status })
    return await this.postRepository.findOne({
      where: { id: dto.id },
      select: { status: true },
    })
  }
}
