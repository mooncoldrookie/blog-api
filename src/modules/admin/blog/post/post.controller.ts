import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../../../../common/decotator/roles.decorator'
import { Role } from '../../../../common/enum/role.enum'
import { JwtAuthGuard } from '../../../../common/guard/jwt-auth.guard'
import { RolesGuard } from '../../../../common/guard/roles.guard'
import { CreatePostDto, SetStatusDto, SetTopDto, UpdatePostDto } from './post.dto'
import { PostService } from './post.service'
import { PaginationQueryDto } from '../../../../common/request/general'

@ApiTags('文章模块')
@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postService.findOne(id)
  }

  @Get('edit/:id')
  async getEditPostData(@Param('id') id: number) {
    return await this.postService.getEditPostData(id)
  }

  @Get()
  async find(@Query() dto: PaginationQueryDto) {
    return await this.postService.find(dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return await this.postService.create(dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return await this.postService.update(id, dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.postService.delete(id)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('setTop')
  async setTop(@Body() dto: SetTopDto) {
    return await this.postService.setTop(dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('setStatus')
  async setStatus(@Body() dto: SetStatusDto) {
    return await this.postService.setStatus(dto)
  }
}
