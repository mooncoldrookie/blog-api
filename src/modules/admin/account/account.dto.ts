import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsString, Matches } from 'class-validator'
import { CreateUserDto } from '../system/sys-user/sys-user.dto'

export class UpdatePwdDto {
  @ApiProperty({
    description: '密码',
  })
  @IsString()
  old: string

  @ApiProperty({
    description:
      '密码，必须包含字母和数字的组合，可以使用特殊字符，长度在6-16之间',
  })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/, {
    message: '密码必须包含字母和数字的组合，可以使用特殊字符，长度在6-16之间',
  })
  new: string
}
export class UpdateHeadDto extends PickType(CreateUserDto, ['head']) {}
export class UpdateUsernameDto extends PickType(CreateUserDto, ['username']) {}
export class UpdateEmailDto extends PickType(CreateUserDto, ['email']) {}
