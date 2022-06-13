export default {
  rootRoleId: 1,
  // JWT 加密签名
  jwt: {
    secret: process.env.JWT_SECRET || 'chuangqianmingyueguang123',
  },
  // typeorm config
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    name:'postgres',
    // 自动加载模块
    autoLoadEntities: true,
    synchronize:true
  },
  redis: {
    host: '127.0.0.1',
    port: 6380,
    password: '123456',
    db: 0,
  },
}
