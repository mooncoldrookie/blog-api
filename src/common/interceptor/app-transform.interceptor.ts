import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { Request, Response } from "express";
import { AppResponse } from "../response/general";

/**
 * 全局过滤器
 * 处理请求和响应
 */
@Injectable()
export class AppTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>()
    return next.handle().pipe(
      map((data) => {
        res.setHeader('Content-Type','application/json; charset=utf-8')

        // 默认 code=0 为成功
        return  AppResponse.OK(data)
      }),

    )
  }
}
