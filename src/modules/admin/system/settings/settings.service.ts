import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import SysConfig from '../../../../entities/admin/sys-config.entity'
import { UpdateSystemConfigDto } from './settings.dto'
import { ApiException } from '../../../../common/filter/api-exception'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SysConfig)
    private readonly systemConfigRepository: Repository<SysConfig>,
  ) {}

  async findOne(where: Partial<SysConfig>) {
    const exist = await this.systemConfigRepository.findOne({ where })
    if (!exist) {
      throw new ApiException(16000)
    }
    return exist
  }

  async find() {
    const exist = await this.systemConfigRepository.findOneBy({ type: 'admin' })
    if (!exist) {
      throw new ApiException(16000)
    }
    return exist
  }

  // 配置项直接通过数据库增加一条数据 且只存在一条
  async update(dto: UpdateSystemConfigDto) {
    const exist = await this.systemConfigRepository.findOneBy({ type: 'admin' })
    if (!exist) {
      throw new ApiException(16000)
    }
    await this.systemConfigRepository.update({ type: 'admin' }, dto)
  }
}
