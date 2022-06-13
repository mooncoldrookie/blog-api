import { Module } from '@nestjs/common'
import { LogController } from './log.controller'
import { LogService } from './log.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import SysLoginLog from '../../../../entities/admin/sys-login-log.entity'
import { VisitLog } from '../../../../entities/admin/visit-log.entity'
import { Post } from '../../../../entities/blog/post.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SysLoginLog, VisitLog, Post])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
