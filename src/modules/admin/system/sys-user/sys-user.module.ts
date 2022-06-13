import { Module } from '@nestjs/common'
import { SysUserController } from './sys-user.controller'
import { SysUserService } from './sys-user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SysUser } from '../../../../entities/admin/sys-user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SysUser])],
  controllers: [SysUserController],
  providers: [SysUserService],
  exports: [SysUserService],
})
export class SysUserModule {}
