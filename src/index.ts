import { createServer } from '@blued-core/http-server'
import * as path from 'path';

// const customControllersWindowsPath = [path.join(path.dirname(process.mainModule.filename), '\\action\\live\\controller')]
const customControllersMacPath = [path.join(path.dirname(process.mainModule.filename),
  '/action/live/controller')]
createServer({
  // 指定 controller目录路径
  // controllersPath: customControllersWindowsPath,
  controllersPath: customControllersMacPath,
  logPath: './log',
  port: 8081
})

console.log("Server start http://127.0.0.1:8081/user/get");

