import { IsOptional, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationQueryDto {
  @ApiProperty()
  @IsOptional()
  @Min(1)
  limit: number

  @ApiProperty()
  @IsOptional()
  offset: number
}
