import { createServer } from '@blued-core/http-server'
import * as path from 'path';

const customControllersPath = [path.join(path.dirname(process.mainModule.filename), '\\action\\live\\controller')]
createServer({
  // 指定 controller目录路径
  controllersPath: customControllersPath,
  logPath: './log',
  port: 8081
})

console.log("Server start http://127.0.0.1:8081t");
console.log(customControllersPath);

