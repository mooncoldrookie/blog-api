import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TagService } from './tag.service'
import { PaginationQueryDto } from '../../../../common/request/general'
import { BatchDeleteDto, CreateTagDto, UpdateTagDto } from './tag.dto'
import { JwtAuthGuard } from '../../../../common/guard/jwt-auth.guard'
import { RolesGuard } from '../../../../common/guard/roles.guard'
import { Roles } from '../../../../common/decotator/roles.decorator'
import { Role } from '../../../../common/enum/role.enum'

@UseGuards(JwtAuthGuard)
@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async find(@Query() pagi: PaginationQueryDto) {
    return await this.tagService.find(pagi)
  }

  @Get('all')
  async findAll() {
    return await this.tagService.findAll()
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() dto: CreateTagDto) {
    return await this.tagService.create(dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    return await this.tagService.update(id, dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.tagService.delete(id)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('/batch')
  async batchDelete(@Body() dto: BatchDeleteDto) {
    console.log('dto', dto)
    return await this.tagService.batchDelete(dto)
  }
}
