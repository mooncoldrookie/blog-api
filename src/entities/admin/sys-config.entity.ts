import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
import { Base } from '../base.entity'

@Entity({ name: 'sys_config' })
export default class SysConfig extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, comment: '标记为admin的唯一设置' })
  type: string

  @Column({ default: 'SunMoon' })
  siteName: string

  @Column({ default: 'SunMoon' })
  author: string

  @Column({ default: '', comment: '桌面端首页背景图' })
  desktopHomeBanner: string

  @Column({ default: '', comment: '移动端首页背景图' })
  mobileHomeBanner: string

  @Column({ default: '', comment: '页脚问候语' })
  footerGreeting: string

  @Column({ default: '', comment: '博客头像' })
  avatar: string

  @Column({ default: '', comment: '博客介绍页背景图' })
  aboutBanner: string

  @Column({ default: '', comment: '博客个人签名' })
  intro: string

  @Column({ type: 'text', default: '', comment: '博客介绍' })
  description: string
}
