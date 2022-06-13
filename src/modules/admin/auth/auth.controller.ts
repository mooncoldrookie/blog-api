import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CaptchaImgDto, LoginDto } from './auth.dto'
import { Request } from 'express'
import { IpAddress } from '../../../common/decotator/ip-address.decorator'

@ApiTags('登录鉴权模块')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '用户登录',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request, @IpAddress() ip: string) {
    return await this.authService.login(loginDto, ip, req)
  }

  @ApiOperation({
    summary: '获取登录图片验证码',
  })
  @Get('captcha/img')
  async getCaptchaImg(@Query() captchaImgDto: CaptchaImgDto) {
    return await this.authService.createCaptchaImg(captchaImgDto)
  }
}
