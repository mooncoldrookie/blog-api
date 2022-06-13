import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { Logger } from '../util/logger'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const statusCode = res.statusCode
    next()

    // 拼接日志信息
    const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${statusCode} \n Message: ${res.statusMessage} \n`
    // 根据状态码，进行日志类型区分
    if (statusCode >= 500) {
      Logger.error(logFormat)
    } else if (statusCode >= 400) {
      Logger.warn(logFormat)
    } else {
      Logger.access(logFormat)
      Logger.log(logFormat)
    }
  }
}
