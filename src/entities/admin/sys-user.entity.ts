import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from '../base.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('sys_user')
export class SysUser extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @Generated('uuid')
  @ApiProperty()
  uuid: string

  @Column({ length: 30, unique: true })
  @ApiProperty()
  username: string

  @Column({ length: 100, select: false })
  @ApiProperty()
  password: string

  @Column()
  @ApiProperty()
  role: string

  @Column({ nullable: true })
  @ApiProperty()
  head: string

  @Column({ unique: true, nullable: true })
  @ApiProperty()
  email: string

  @Column({ type: 'smallint', nullable: true, default: 1 })
  @ApiProperty()
  status: number
}
