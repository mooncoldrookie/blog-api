import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from '../base.entity'
import { Post } from './post.entity'

@Entity()
export class Tag extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 64, unique: true })
  name: string

  @Column({ length: 64, nullable: true })
  alias: string

  @ManyToMany(() => Post, (post) => post.tags,{createForeignKeyConstraints:false})
  posts: Post[]
}
