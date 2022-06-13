import { Module } from '@nestjs/common'
import { SystemModule } from './system/system.module'
import { AccountModule } from './account/account.module'
import { WebsiteModule } from "../website/website.module";
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from "../cache/cache.module";
import { FileModule } from './file/file.module';

/**
 * admin模块
 * /admin路径下的API模块
 */
@Module({
  imports: [
    AuthModule,
    SystemModule,
    AccountModule,
    WebsiteModule,
    BlogModule,
    CacheModule,
    FileModule
  ],
  providers:[
  ]
})
export class AdminModule {}
