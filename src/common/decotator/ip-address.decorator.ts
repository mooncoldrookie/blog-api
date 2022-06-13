import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import * as requestIp from 'request-ip'

export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    let ip = requestIp.getClientIp(req)
    if (ip.split(',').length > 0) {
      ip = ip.split(',')[0]
    }
    ip = ip.slice(ip.lastIndexOf(':') + 1, ip.length)
    return ip
  },
)
