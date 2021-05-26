import { Sequelize } from 'sequelize-typescript'  // 注意点：从 sequelize-typescript 导入，而不是 sequelize
import * as path from 'path'

/**
 * 初始化MySQL
 */
export function initDB() {
  const _ = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'study',
    username: 'root',
    password: '123456',
    // 加载实体，扫描model所在目录
    models: [path.resolve(__dirname, `./action/live/model`)],
    // 连接池的一些相关配置
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // true 会在控制台打印每次sequelize操作时对应的SQL命令
    logging: true,
    // 创建表
    sync: { force: false }
  })
}
