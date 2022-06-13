import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppHttpExceptionFilter } from './common/filter/app-http-exception.filter'
import { AppTransformInterceptor } from './common/interceptor/app-transform.interceptor'
import { setupSwagger } from './common/doc/setup-swagger'
import { AppValidationPipe } from './common/pipe/app-validation.pipe'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as CookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // cors
  app.enableCors({
    origin: function (requestOrigin, callback) {
      callback(null, requestOrigin)
    },
    credentials: true,
  })

  app.use(CookieParser())

  // 全局管道  处理请求参数以及验证
  app.useGlobalPipes(
    new ValidationPipe({
      // 剥夺已验证对象的任何没有装饰器的属性
      whitelist: true,
      // 验证器将抛出错误，而不是剥离非白名单属性
      // forbidNonWhitelisted: true,
      // 尝试转换数字和字符串类型 字符转换成数字失败会变成NaN
      transform: true,
      transformOptions: {
        // 将全局开启类型转换 不再需要使用@Type()修饰符显示指定类型
        enableImplicitConversion: true,
      },
    }),
  )
  // static path
  app.useStaticAssets(join(__dirname, '../public/'), {})

  app.useGlobalPipes(new AppValidationPipe())

  // 全局过滤器 处理 http 异常
  app.useGlobalFilters(new AppHttpExceptionFilter())

  // 全局拦截器 请求前处理以及拦截响应进行包装和处理
  app.useGlobalInterceptors(new AppTransformInterceptor())

  //  配置 swagger API 文档
  if (process.env.NODE_ENV === 'production') {
    setupSwagger(app)
  }

  await app.listen(process.env.SERVER_PORT || 3000)
}
bootstrap()
