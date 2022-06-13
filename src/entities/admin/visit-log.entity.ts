import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'visit_log' })
export class VisitLog {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column({ nullable: true })
  @ApiProperty()
  ip: string

  @Column({ type: 'timestamp with time zone', nullable: true })
  @ApiProperty()
  time: Date

  @Column({ nullable: true })
  @ApiProperty()
  ua: string
}
