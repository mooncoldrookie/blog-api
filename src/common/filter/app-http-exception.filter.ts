import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiException } from './api-exception'
import { Logger } from '../util/logger'
import { AppResponse } from '../response/general'
import { isDev } from '../util'

/**
 * 全局异常过滤器
 */
@Catch()
export class AppHttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>()
    const res = host.switchToHttp().getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrorCode()
        : status

    let msg = '服务器异常，请稍后再试'

    // 线上屏蔽 500 以内错误
    if (isDev() || status < 500) {
      msg =
        exception instanceof HttpException ? exception.message : `${exception}`
    }

    const log = `
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${status}
    Response: ${exception} 
    `

    if (status >= 500) {
      Logger.error(log)
      Logger.access(log)
    } else {
      Logger.info(log)
    }

    res.status(status).json(new AppResponse(false, code, null, msg))
  }
}
