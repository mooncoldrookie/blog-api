import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../../../common/decotator/roles.decorator'
import { Role } from '../../../common/enum/role.enum'
import { RolesGuard } from '../../../common/guard/roles.guard'

@ApiTags('文件模块')
@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  /**
   * 单文件上传
   * @param body
   * @param file
   */
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const path = 'http://localhost:' + process.env.SERVER_PORT + '/upload/' + file.filename
    return {
      filename: file.filename,
      path,
      size: file.size,
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @Post('uploads')
  uploadFiles(@Body() body: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    return files.map((file) => ({
      filename: file.fieldname,
      path: file.path,
      size: file.size,
    }))
  }
}
