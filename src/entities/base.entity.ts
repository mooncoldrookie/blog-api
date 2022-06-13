import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export abstract class Base {
  @CreateDateColumn({ name: 'created_at',type:'timestamp with time zone' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at',type:'timestamp with time zone' })
  @ApiProperty()
  updatedAt: Date;
}
