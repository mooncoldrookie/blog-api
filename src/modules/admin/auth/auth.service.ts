import { Injectable } from '@nestjs/common'
import { SysUserService } from '../system/sys-user/sys-user.service'
import { JwtService } from '@nestjs/jwt'
import { CacheService } from '../../cache/cache.service'
import { CaptchaImgDto, LoginDto } from './auth.dto'
import * as SvgCaptcha from 'svg-captcha'
import { nanoid } from 'nanoid'
import { isEmpty } from 'lodash'
import { ApiException } from '../../../common/filter/api-exception'
import { LogService } from '../system/log/log.service'
import { Request } from 'express'
import { compare } from '../../../common/util'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: SysUserService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly logService: LogService,
  ) {}

  /**
   * 登录方法 先校验验证码 然后校验用户名和密码 登录成功后记录日志
   * @param loginDto
   * @param ip
   * @param req
   */
  async login(loginDto: LoginDto, ip: string, req: Request) {
    const { captchaId, verifyCode, username, password } = loginDto
    await this.checkCaptcha(captchaId, verifyCode)
    // 验证用户名密码 未通过会抛出错误 通过返回token
    const { token, user } = await this.getLoginSign(username, password, captchaId)
    // 记录登录日志
    await this.logService.recordLoginLog(ip, user, req)
    return { token }
  }

  /**
   * 颁发 jwt 签证
   * @return token
   */
  async getLoginSign(username: string, password: string, captchaId: string) {
    const user = await this.userService.findOneBy({ username })
    if (isEmpty(user)) {
      throw new ApiException(10003)
    }
    const userWithPassword = await this.userService.getUserPassword(user.id)
    const pass = compare(password, userWithPassword.password)
    if (!pass) {
      throw new ApiException(10003)
    }
    const payload = {
      sub: user.id,
      username,
      role: user.role,
    }
    const token = this.jwtService.sign(payload)
    // 登陆成功后删除缓存的验证码信息
    await this.cacheService.del(`admin:captcha:img:${captchaId}`)
    return { token, user }
  }

  /**
   * 创建验证码
   * @param captcha
   */
  async createCaptchaImg(captcha: CaptchaImgDto) {
    const svg = SvgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: captcha.width ? captcha.width : 100,
      height: captcha.height ? captcha.height : 50,
      charPreset: '1234567890',
    })

    const captchaInfo = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: nanoid(),
    }
    // 60秒过期时间
    await this.cacheService.set(`admin:captcha:img:${captchaInfo.id}`, svg.text, 60 * 10)
    return captchaInfo
  }

  /**
   * 校验验证码
   * @param id
   * @param code
   */
  async checkCaptcha(id: string, code: string) {
    const cachedCode: string = await this.cacheService.get(`admin:captcha:img:${id}`)
    code = JSON.stringify(code)
    if (isEmpty(cachedCode) || code.toLocaleLowerCase() !== cachedCode.toLocaleLowerCase()) {
      throw new ApiException(10002)
    }
  }
}
