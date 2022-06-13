import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Between, Repository } from 'typeorm'
import { VisitLog } from '../../../../entities/admin/visit-log.entity'
import { InjectRepository } from '@nestjs/typeorm'
import dateFormat from '../../../../common/util/date-format'
import { Post } from '../../../../entities/blog/post.entity'
import SysLoginLog from '../../../../entities/admin/sys-login-log.entity'
import { PaginationQueryDto } from '../../../../common/request/general'
import { SysUser } from '../../../../entities/admin/sys-user.entity'

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(VisitLog)
    private readonly visitLogRepository: Repository<VisitLog>,
    @InjectRepository(SysLoginLog)
    private readonly loginRepository: Repository<SysLoginLog>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async recordAccess(date: string, ip: string, req: Request) {
    const log = new VisitLog()
    log.ip = ip
    log.ua = req.headers['user-agent']
    log.time = new Date(date)
    const entity = this.visitLogRepository.create(log)
    await this.visitLogRepository.save(entity)
  }

  async getVisitsChartData(days: number) {
    const data = []
    const dateArray = []
    const promiseArray = []

    for (let i = 0; i < days; i++) {
      promiseArray.push(
        new Promise((resolve) => {
          const start = new Date(
            new Date(new Date().setDate(new Date().getDate() - i - 1)).setHours(0, 0, 0, 0),
          )
          const end = new Date(
            new Date(new Date().setDate(new Date().getDate() - i)).setHours(0, 0, 0, 0),
          )
          dateArray.push(dateFormat(start).format('MM/DD'))
          resolve(
            this.visitLogRepository.count({
              where: {
                time: Between(start, end),
              },
            }),
          )
        }),
      )
    }

    await Promise.all(promiseArray).then((results) => {
      results.forEach((count, index) => {
        const item = []
        item.push(dateArray[index], count)
        data.unshift(item)
      })
    })
    return data
  }

  async getBlogStatistics() {
    const all = await this.postRepository.find({
      select: {
        views: true,
      },
    })
    const websiteVisits = await this.visitLogRepository.count()
    let count = 0
    all.forEach((item) => (count += item.views))

    return {
      postsCount: all.length,
      postsViews: count,
      websiteVisits,
    }
  }

  /**
   * 用户登录时记录日志
   */
  async recordLoginLog(ip: string, user: SysUser, req: Request) {
    const loginLog = new SysLoginLog()
    loginLog.role = user.role
    loginLog.userId = user.id
    loginLog.username = user.username
    loginLog.ip = ip
    loginLog.ua = req.headers['user-agent']

    const entity = this.loginRepository.create(loginLog)
    await this.loginRepository.save(entity)
  }

  async getLoginLog({ offset, limit }: PaginationQueryDto) {
    console.log(offset, limit)
    const list = await this.loginRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: offset,
    })
    const total = await this.loginRepository.count()
    let page = offset / limit + 1
    if (!page) page = 1
    return {
      list,
      total,
      size: limit,
      page,
    }
  }
}
