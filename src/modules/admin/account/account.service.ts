import { Injectable } from '@nestjs/common'
import { UpdateEmailDto, UpdateHeadDto, UpdatePwdDto, UpdateUsernameDto } from './account.dto'
import { SysUserService } from '../system/sys-user/sys-user.service'
import { ApiException } from '../../../common/filter/api-exception'
import { isEmpty } from 'lodash'
import { InjectRepository } from '@nestjs/typeorm'
import { SysUser } from '../../../entities/admin/sys-user.entity'
import { Repository } from 'typeorm'
import { compare, encrypt } from '../../../common/util'

@Injectable()
export class AccountService {
  constructor(
    private readonly userService: SysUserService,
    @InjectRepository(SysUser)
    private readonly userRepository: Repository<SysUser>,
  ) {}

  async updatePassword(user: any, dto: UpdatePwdDto) {
    if (isEmpty(user)) {
      throw new ApiException(11001)
    }
    const exist = await this.userRepository.findOne({
      where: { id: user.userId },
      select: { password: true },
    })
    // 检查旧密码与原密码是否一致 不一致则返回错误
    if (!compare(dto.old, exist.password)) {
      throw new ApiException(10004)
    }
    // 检查新密码与原密码是否相同 相同则返回错误
    if (compare(dto.new, exist.password)) {
      throw new ApiException(10007)
    }
    const hashPass = encrypt(dto.new)
    return await this.userRepository.update(user.userId, { password: hashPass })
  }

  async getUserInfo(user: any) {
    if (isEmpty(user)) {
      throw new ApiException(11001)
    }
    return await this.userService.findOneBy({ id: user.userId })
  }

  async updateHead(user: any, dto: UpdateHeadDto) {
    if (isEmpty(user)) {
      throw new ApiException(11001)
    }
    await this.userRepository.update(user.userId, { head: dto.head })
  }

  async updateUsername(user: any, dto: UpdateUsernameDto) {
    if (isEmpty(user)) {
      throw new ApiException(11001)
    }
    await this.userRepository.update(user.userId, { username: dto.username })
  }
  async updateEmail(user: any, dto: UpdateEmailDto) {
    if (isEmpty(user)) {
      throw new ApiException(11001)
    }
    await this.userRepository.update(user.userId, dto)
  }
}
