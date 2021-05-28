import 'reflect-metadata'

import { createServer, useContainer } from '@blued-core/http-server'
import * as path from 'path'
import initDB from './app'
/* 导入 Container不起作用*/
// import { Container } from 'typedi';
// 1. 初始化 DB

initDB()
/* 导入 Container不起作用*/
// useContainer(Container)


// 2. 启动 server
// const customControllersWindowsPath = [path.join(path.dirname(process.mainModule.filename), '\\action\\live\\controller')]
const customControllersMacPath = [path.join(path.dirname(process.mainModule.filename),
  '/action/live/controller')]
createServer({
  // 指定 controller目录路径
  // controllersPath: customControllersWindowsPath,
  controllersPath: customControllersMacPath,
  logPath: './log',
  port: 8081,
})



console.log("Server start http://127.0.0.1:8081/users/1");

