import { Base } from '../base.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './post.entity'

@Entity()
export class Category extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 64, unique: true })
  name: string

  @Column({ length: 64, nullable: true })
  alias: string

  @OneToMany(() => Post, (post) => post.category, {
    createForeignKeyConstraints: false,
  })
  posts: Post[]
}
