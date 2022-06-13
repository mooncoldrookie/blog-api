import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

/**
 * 配置swagger
 * @param app NestApplication 实例
 */
export function setupSwagger(app: INestApplication) {
  const configService: ConfigService = app.get(ConfigService)
  const enable = configService.get<boolean>('swagger.enable', true)

  if (!enable) return

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('swagger.title'))
    .setDescription(configService.get('swagger.description'))
    .addBearerAuth()
    .setVersion(configService.get('swagger.version'))
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api', app, document)
}
