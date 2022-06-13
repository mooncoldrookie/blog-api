import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { CacheService } from '../../cache/cache.service'
import { SysUserModule } from '../system/sys-user/sys-user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard'
import { LogModule } from '../system/log/log.module'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: { expiresIn: 60 * 60 * 24 * 7 },
        }
      },
      inject: [ConfigService],
    }),
    SysUserModule,
    LogModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CacheService, JwtStrategy, JwtAuthGuard],
  exports: [AuthModule],
})
export class AuthModule {}
