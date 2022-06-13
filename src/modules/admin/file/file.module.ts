import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join } from 'path'
import { nanoid } from 'nanoid'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => {
        return {
          storage: diskStorage({
            destination: join(process.cwd(), '/public/upload'),
            filename: (req, file, cb) => {
              const filename = `${nanoid()}.${file.mimetype.split('/')[1]}`
              return cb(null, filename)
            },
          }),
        }
      }
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
