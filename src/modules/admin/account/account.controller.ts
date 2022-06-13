import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateEmailDto, UpdateHeadDto, UpdatePwdDto, UpdateUsernameDto } from './account.dto'
import { AccountService } from './account.service'
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard'
import { Request } from 'express'
import { RolesGuard } from '../../../common/guard/roles.guard'
import { Roles } from '../../../common/decotator/roles.decorator'
import { Role } from '../../../common/enum/role.enum'

@ApiTags('用户账户模块')
@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ description: '获取用户信息' })
  @Get('info')
  async info(@Req() request: Request) {
    const user = request.user
    return await this.accountService.getUserInfo(user)
  }

  @ApiOperation({ description: '修改头像' })
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('updateHead')
  async updateHead(@Req() request: Request, @Body() dto: UpdateHeadDto) {
    const user: any = request.user
    return await this.accountService.updateHead(user, dto)
  }

  @ApiOperation({ description: '修改用户名' })
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('updateUsername')
  async updateUsername(@Req() request: Request, @Body() dto: UpdateUsernameDto) {
    const user: any = request.user
    return await this.accountService.updateUsername(user, dto)
  }

  @ApiOperation({ description: '修改邮箱' })
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('updateEmail')
  async updateEmail(@Req() request: Request, @Body() dto: UpdateEmailDto) {
    const user: any = request.user
    return await this.accountService.updateEmail(user, dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ description: '修改密码' })
  @Post('updatePassword')
  async updatePassword(@Req() request: Request, @Body() dto: UpdatePwdDto) {
    const user: any = request.user
    return await this.accountService.updatePassword(user, dto)
  }
}
