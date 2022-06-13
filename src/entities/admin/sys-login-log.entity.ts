import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'sys_login_log' })
export default class SysLoginLog {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column()
  @ApiProperty()
  userId: number

  @Column()
  @ApiProperty()
  role: string

  @Column()
  @ApiProperty()
  username: string

  @Column({ nullable: true })
  @ApiProperty()
  ip: string

  @Column({ length: 500, nullable: true })
  @ApiProperty()
  ua: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  @ApiProperty()
  createdAt: Date
}
