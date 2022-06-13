import { OmitType } from '@nestjs/swagger'
import { SysUser } from '../../../../entities/admin/sys-user.entity'

export class UserVo extends OmitType(SysUser, ['password']) {

}
