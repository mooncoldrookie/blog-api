import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BatchDeleteDto, CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { CategoryService } from './category.service'
import { PaginationQueryDto } from '../../../../common/request/general'
import { RolesGuard } from '../../../../common/guard/roles.guard'
import { Roles } from '../../../../common/decotator/roles.decorator'
import { Role } from '../../../../common/enum/role.enum'
import { JwtAuthGuard } from '../../../../common/guard/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@ApiTags('文章分类模块')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async find(@Query() pagi: PaginationQueryDto) {
    return await this.categoryService.find(pagi)
  }

  @Get('all')
  async findAll() {
    return await this.categoryService.findAll()
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoryService.delete(id)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('/batch')
  async batchDelete(@Body() dto: BatchDeleteDto) {
    console.log('dto', dto)
    return await this.categoryService.batchDelete(dto)
  }
}
