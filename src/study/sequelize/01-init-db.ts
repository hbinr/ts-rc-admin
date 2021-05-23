/**
 * 初始化数据库连接，要点：
 * 1. 导入 sequelize 库
 * 2. new Sequelize()即可建立连接，后续CURD操作都在该实例上进行操作
 */

import { Sequelize } from 'sequelize';


export const globalSequelize = new Sequelize('mysql://root:123456@localhost:3306/study',
  {
    logging: console.log, //  默认值,显示日志函数调用的第一个参数
  })




export async function initDB(): Promise<void> {
  try {
    await globalSequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}