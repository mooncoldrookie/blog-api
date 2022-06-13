import { Base } from '../base.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Tag } from './tag.entity'
import { Category } from './category.entity'

@Entity()
export class Post extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 32 })
  author: string

  @Column({ length: 1024 })
  title: string

  @Column({ type: 'text', comment: '预览或摘要', nullable: true })
  summary: string

  @Column({ nullable: true })
  cover: string

  @Column({
    type: 'smallint',
    nullable: true,
    default: 1,
    comment: '文章状态，0：未发布，1：已发布',
  })
  status: number

  @Column({ type: 'boolean', nullable: true, default: false, comment: '置顶' })
  top: boolean

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    comment: '发布时间',
  })
  publishDate: Date

  @Column({ nullable: true, default: 0, comment: '阅读数' })
  views: number

  @Column({ nullable: true, default: 0, comment: '评论数' })
  comments: number

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'text' })
  contentHtml: string

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    createForeignKeyConstraints: false,
  })
  @JoinTable({ name: 'sys_post_tags' })
  tags: Tag[]

  @ManyToOne(() => Category, (category) => category.posts, {
    createForeignKeyConstraints: false,
  })
  category: Category
}
