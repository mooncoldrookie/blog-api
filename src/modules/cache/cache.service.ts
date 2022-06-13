import { Injectable } from '@nestjs/common';
import RedisClient, { Redis } from 'ioredis';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CacheService {
  redisClient:Redis

  constructor(private readonly configService:ConfigService) {
    this.redisClient = new RedisClient({
      port:configService.get<number>('redis.port'),
      host:configService.get<string>('redis.host'),
      password:configService.get<string>('redis.password'),
      db:configService.get<number>('redis.db')
    })
  }

  /**
   * @Description: 封装设置redis缓存的方法
   * @param key {String} key值
   * @param value {String} key的值
   * @param seconds {Number} 过期时间
   * @return: Promise<any>
   */
  public async set(key: string, value: any, seconds?: number): Promise<any> {
    value = JSON.stringify(value);
    if (!seconds) {
      await this.redisClient.set(key, value);
    } else {
      await this.redisClient.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @Description: 获取redis缓存中的值
   * @param key {String}
   */
  public async get(key: string): Promise<any> {
    const data = await this.redisClient.get(key);
    if (data) return data;
    return null;
  }

  /**
   * @Description: 根据key删除redis缓存数据
   * @param key {String}
   * @return:
   */
  public async del(key: string): Promise<any> {
    return await this.redisClient.del(key);
  }

  /**
   * @Description: 清空redis的缓存
   * @param {type}
   * @return:
   */
  public async flushAll(): Promise<any> {
    return await this.redisClient.flushall();
  }


}
