import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { LogService } from './log.service'
import { IpAddress } from '../../../../common/decotator/ip-address.decorator'
import { Request } from 'express'
import { GetVisitsChartDataDto, RecordAccessDto } from './log.dto'
import { JwtAuthGuard } from '../../../../common/guard/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { PaginationQueryDto } from '../../../../common/request/general'

@ApiTags('日志模块')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('record/access')
  async recordAccess(@Body() dto: RecordAccessDto, @IpAddress() ip: string, @Req() req: Request) {
    return this.logService.recordAccess(dto.date, ip, req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('visitsChartData')
  async getVisitsChartData(@Query() dto: GetVisitsChartDataDto) {
    return this.logService.getVisitsChartData(dto.days)
  }

  @UseGuards(JwtAuthGuard)
  @Get('blogStatistics')
  async getBlogStatistics() {
    return this.logService.getBlogStatistics()
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  async getLoginLog(@Query() dto: PaginationQueryDto) {
    return await this.logService.getLoginLog(dto)
  }
}
