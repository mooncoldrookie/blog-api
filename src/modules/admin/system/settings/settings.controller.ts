import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { SettingsService } from './settings.service'
import { UpdateSystemConfigDto } from './settings.dto'
import { JwtAuthGuard } from '../../../../common/guard/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '../../../../common/guard/roles.guard'
import { Roles } from '../../../../common/decotator/roles.decorator'
import { Role } from '../../../../common/enum/role.enum'

@ApiTags('博客配置模块')
@Controller('config')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async find() {
    return await this.settingsService.find()
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch()
  async update(@Body() dto: UpdateSystemConfigDto) {
    return this.settingsService.update(dto)
  }
}
