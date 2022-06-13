import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { SysUserModule } from '../system/sys-user/sys-user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUser } from '../../../entities/admin/sys-user.entity'

@Module({
  imports: [SysUserModule, TypeOrmModule.forFeature([SysUser])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
