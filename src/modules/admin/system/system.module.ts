import { Module } from '@nestjs/common'
import { LogModule } from './log/log.module'
import { SysUserModule } from './sys-user/sys-user.module'
import { SettingsModule } from './settings/settings.module'

@Module({
  imports: [LogModule, SysUserModule, SettingsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class SystemModule {}
