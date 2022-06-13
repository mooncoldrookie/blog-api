import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateSystemConfigDto {
  @ApiProperty()
  @IsString()
  siteName: string

  @ApiProperty()
  @IsString()
  desktopHomeBanner: string

  @ApiProperty()
  @IsString()
  mobileHomeBanner: string

  @ApiProperty()
  @IsString()
  footerGreeting: string

  @ApiProperty()
  @IsString()
  avatar: string

  @ApiProperty()
  @IsString()
  aboutBanner: string

  @ApiProperty()
  @IsString()
  intro: string

  @ApiProperty()
  @IsString()
  description: string
}
