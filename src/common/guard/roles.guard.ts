import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { ROLES_KEY } from '../decotator/roles.decorator'
import { Role } from '../enum/role.enum'
import { USER_KEY } from "../constants";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RolesGuard extends AuthGuard('jwt'){
  constructor(private reflector: Reflector) {
    super()
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const baseGuardResult = await super.canActivate(context);
    console.log('baseGuardResult',baseGuardResult)
    if(!baseGuardResult){
      return false;
    }
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest<Request>()

    const user = request[USER_KEY]
    console.log('roles',roles)
    console.log('user',user)

    return roles.includes(user['role'])
  }
}
