import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../../../../entities/blog/category.entity'
import { Repository } from 'typeorm'
import {
  BatchDeleteDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './category.dto'
import { ApiException } from '../../../../common/filter/api-exception'
import { PaginationQueryDto } from '../../../../common/request/general'
import { PageResult } from '../../../../common/response/general'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findOne(id: number) {
    return await this.categoryRepository.findOne({ where: { id } })
  }

  async findOneByName(name: string) {
    return await this.categoryRepository.findOne({ where: { name } })
  }

  async findAll() {
    return await this.categoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    })
  }

  async find({
    offset,
    limit,
  }: PaginationQueryDto): Promise<PageResult<Category>> {
    const list = await this.categoryRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    })
    const total = await this.categoryRepository.count()
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      list,
      total: total,
      size: limit,
      page,
    }
  }

  async create(dto: CreateCategoryDto) {
    const exist = await this.categoryRepository.findOneBy({ name: dto.name })
    if (exist) {
      throw new ApiException(13001)
    }
    const entity = this.categoryRepository.create(dto)
    return await this.categoryRepository.save(entity)
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const exist = await this.categoryRepository.findOneBy({ id })
    if (!exist) {
      throw new ApiException(13000)
    }
    await this.categoryRepository.update(id, dto)
  }

  async delete(id: number) {
    const exist = await this.categoryRepository.findOneBy({ id })
    if (!exist) {
      throw new ApiException(13000)
    }
    await this.categoryRepository.delete(id)
  }

  // 批量删除
  async batchDelete(dto: BatchDeleteDto) {
    for (const id of dto.ids) {
      await this.delete(id)
    }
  }
}
