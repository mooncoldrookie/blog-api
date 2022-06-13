/**
 * 全局环境变量类型
 */
export interface IAppConfig {
  /**
   * root管理员角色ID，该角色下分配的管理员都为超级管理员
   */
  rootRoleId?: number;
  /**
   * JWT签名
   */
  jwt?: JwtConfigOptions;
  /**
   * 数据库配置
   */
  database?: DataBaseConfigOptions;
  /**
   * Redis配置
   */
  redis?: RedisConfigOptions;
  /**
   * Swagger文档配置
   */
  swagger?: SwaggerConfigOptions;
}

//---------app config interface ------------

export interface JwtConfigOptions {
  secret: string;
}


export interface RedisConfigOptions {
  host?: string;
  port?: number | string;
  password?: string;
  db?: number;
}

export interface DataBaseConfigOptions {
  type?: string;
  host?: string;
  port?: number | string;
  username?: string;
  password?: string;
  database?: string;
  autoLoadEntities?:boolean;
  synchronize?: boolean;
}

export interface SwaggerConfigOptions {
  enable?: boolean;
  path?: string;
  title?: string;
  description?: string;
  version?: string;
}
