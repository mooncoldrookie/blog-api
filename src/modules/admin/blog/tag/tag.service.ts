import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationQueryDto } from '../../../../common/request/general'
import { PageResult } from '../../../../common/response/general'
import { BatchDeleteDto, CreateTagDto, UpdateTagDto } from './tag.dto'
import { ApiException } from '../../../../common/filter/api-exception'
import { Tag } from '../../../../entities/blog/tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findOne(id: number) {
    return await this.tagRepository.findOne({ where: { id } })
  }

  async findOneByName(name: string) {
    return await this.tagRepository.findOne({ where: { name } })
  }

  async findAll() {
    return await this.tagRepository.find()
  }

  async find({ offset, limit }: PaginationQueryDto): Promise<PageResult<Tag>> {
    const list = await this.tagRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    })
    const total = await this.tagRepository.count()
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      list,
      total: total,
      size: limit,
      page,
    }
  }

  async create(dto: CreateTagDto) {
    const exist = await this.tagRepository.findOneBy({ name: dto.name })
    if (exist) {
      throw new ApiException(14001)
    }
    const entity = this.tagRepository.create(dto)
    return await this.tagRepository.save(entity)
  }

  async update(id: number, dto: UpdateTagDto) {
    const exist = await this.tagRepository.findOneBy({ id })
    if (!exist) {
      throw new ApiException(14000)
    }
    await this.tagRepository.update(id, dto)
  }

  async delete(id: number) {
    const exist = await this.tagRepository.findOneBy({ id })
    if (!exist) {
      throw new ApiException(14000)
    }
    await this.tagRepository.delete(id)
  }

  // 批量删除
  async batchDelete(dto: BatchDeleteDto) {
    for (const id of dto.ids) {
      await this.delete(id)
    }
  }
}
