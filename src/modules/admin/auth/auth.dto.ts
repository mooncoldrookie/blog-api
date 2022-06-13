import { IsInt, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateUserDto } from "../system/sys-user/sys-user.dto";
import { Type } from "class-transformer";

export class LoginDto extends PickType(CreateUserDto,['username','password']){

  @ApiProperty({ description: '验证码标识' })
  @IsString()
  captchaId: string;

  @ApiProperty({ description: '用户输入的验证码' })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  verifyCode: string;
}

export class CaptchaImgDto {
  @ApiProperty({
    required: false,
    default: 100,
    description: '验证码宽度',
  })
  @IsInt()
  @IsOptional()
  readonly width: number = 100;

  @ApiProperty({
    required: false,
    default: 50,
    description: '验证码宽度',
  })
  @IsInt()
  @IsOptional()
  readonly height: number = 50;
}
