import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getAppConfig } from './config'
import { AdminModule } from './modules/admin/admin.module'
import { WebsiteModule } from './modules/website/website.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { CacheModule } from './modules/cache/cache.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getAppConfig], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<any>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          synchronize: configService.get<boolean>('database.synchronize'),
          autoLoadEntities: configService.get<boolean>('database.autoLoadEntities'),
        }
      },
      inject: [ConfigService],
    }),
    AdminModule,
    WebsiteModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/')
  }
}
