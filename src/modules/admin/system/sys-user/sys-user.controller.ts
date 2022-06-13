import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto } from './sys-user.dto'
import { SysUserService } from './sys-user.service'
import { UserVo } from './sys-user.vo'
import { PaginationQueryDto } from '../../../../common/request/general'

@ApiTags('后台用户模块')
@Controller('user')
export class SysUserController {
  constructor(private readonly userService: SysUserService) {}

  @ApiOperation({ summary: '根据 offset 和 limit 查找全部用户' })
  @Get()
  async findAll(@Query() pagiDto: PaginationQueryDto) {
    return await this.userService.findAll(pagiDto)
  }

  @ApiOperation({ summary: '根据主键查找用户' })
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.userService.findOneBy({ id })
  }

  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({ type: UserVo })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto)
  }

  @ApiOperation({ summary: '根据主键更新用户' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateUserDto) {
    return await this.userService.update(id, updateDto)
  }

  @ApiOperation({ summary: '根据主键删除用户' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.removeById(id)
  }
}
