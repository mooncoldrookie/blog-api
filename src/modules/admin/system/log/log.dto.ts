import { ApiProperty } from '@nestjs/swagger'
import { IsPositive, IsString, Max, Min } from 'class-validator'

export class RecordAccessDto {
  @ApiProperty({ description: '当前时间字符串' })
  @IsString()
  date: string
}

export class GetVisitsChartDataDto {
  @ApiProperty({ description: '要查询的天数' })
  @Min(1)
  @Max(15)
  days: number
}
