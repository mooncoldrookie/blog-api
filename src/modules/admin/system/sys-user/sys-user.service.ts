import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SysUser } from '../../../../entities/admin/sys-user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from './sys-user.dto'
import { isEmpty } from 'lodash'
import { ApiException } from '../../../../common/filter/api-exception'
import { checkRole, encrypt } from '../../../../common/util'
import { PaginationQueryDto } from '../../../../common/request/general'
import { UserVo } from './sys-user.vo'

@Injectable()
export class SysUserService {
  constructor(
    @InjectRepository(SysUser)
    private readonly userRepository: Repository<SysUser>,
  ) {}

  async getUserPassword(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['password'],
    })
  }

  async findOneBy(query: Partial<UserVo>) {
    return await this.userRepository.findOneBy(query)
  }

  async findOneExistBy(query: Partial<UserVo>) {
    const exist = await this.userRepository.findOneBy(query)
    if (!isEmpty(exist)) {
      throw new ApiException(10001)
    }
    return exist
  }

  /**
   * 查询全部用户信息 不包含密码
   */
  async findAll({ limit, offset }: PaginationQueryDto) {
    return await this.userRepository.find({
      skip: offset,
      take: limit,
    })
  }

  /**
   * 创建新用户
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto) {
    const existUsername = await this.userRepository.findOneBy({
      username: createUserDto.username,
    })
    if (!isEmpty(existUsername)) {
      throw new ApiException(10001)
    }
    if (createUserDto.email) {
      const existEmail = await this.userRepository.findOneBy({
        email: createUserDto.email,
      })
      if (!isEmpty(existEmail)) {
        throw new ApiException(10005)
      }
    }
    // 检查角色权限是否符合规则 只能是 admin user tourist
    if (!checkRole(createUserDto.role)) {
      throw new ApiException(12001)
    }
    createUserDto.password = encrypt(createUserDto.password)
    const entity = this.userRepository.create(createUserDto)
    await this.userRepository.save(entity)
  }

  async update(id: number, updateDto: UpdateUserDto) {
    const user = await this.findOneBy({ id })
    if (!isEmpty(user)) {
      throw new ApiException(12000)
    }
    await this.userRepository.update(id, updateDto)
  }

  async removeById(id: number) {
    const user = await this.findOneBy({ id })
    if (!isEmpty(user)) {
      throw new ApiException(12000)
    }
    await this.userRepository.delete(id)
  }
}
