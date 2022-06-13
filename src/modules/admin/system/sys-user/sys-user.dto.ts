import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Role } from '../../../../common/enum/role.enum'

export class CreateUserDto {
  @ApiProperty({
    description: '用户名只能由4到20位大小写字母、数字、下划线"_"组成',
  })
  @Matches(/^[a-zA-Z0-9_]{4,20}$/, {
    message: '用户名只能由4到20位大小写字母、数字、下划线"_"组成',
  })
  @IsString()
  username: string

  @ApiProperty({
    description:
      '密码必须包含字母和数字的组合，可以使用特殊字符，长度在6-16之间',
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/, {
    message: '密码必须包含字母和数字的组合，可以使用特殊字符，长度在6-16之间',
  })
  password: string

  @ApiProperty({ description: '用户角色' })
  @IsEnum(Role)
  role: string

  @ApiProperty({ description: '头像', required: false })
  @IsString()
  @IsOptional()
  head: string

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsString()
  @IsOptional()
  email: string
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'role']),
) {}
