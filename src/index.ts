// 引入必要库
import 'reflect-metadata'; // 必须在 routing-controllers 之前引入，否则会报错
import { createKoaServer } from 'routing-controllers';
// 引入环境变量
import { PORT } from './config';

import { UserJsonController } from './study/01-json-controller';
import { UserCtxController } from './study/02-context';
import { UserRouteSetController } from './study/03-route-setting';
import { UserParamQueryController } from './study/04-param-query-arg';
import { UserBodyController } from './study/05-body-arg';
import { UserContentTypeController } from './study/06-conten-type';
import { UserVoidRespController } from './study/07-manage-void-response';
import { UserThrowErrController } from './study/08-throw-http-err';
import { UserCustomMiddlewareController } from './study/10-custom-middleware';


// 创建Koa应用，注册所有控制器路由并返回Koa实例
const app = createKoaServer({
  // 可以自定义 defaults 的内容
  defaults: {
    // 返回null时的默认状态码为404
    nullResultCode: 404,

    // 返回viod或Promise<void>时的默认状态码为204
    undefinedResultCode: 204,

    paramOptions: {
      // 参数默认为必填
      required: true,
    },
  },
  routePrefix: '/v1/api',
  // 声明需要使用的控制器
  controllers: [
    UserJsonController,
    UserCtxController,
    UserRouteSetController,
    UserParamQueryController,
    UserBodyController,
    UserContentTypeController,
    UserVoidRespController,
    UserThrowErrController,
    UserCustomMiddlewareController
  ],
});

// app.use(compression()); // 全局使用 compression 中间件
// 在3000端口运行Koa应用
app.listen(3000);


console.log(`应用启动成功 访问: http://127.0.0.1:${PORT}/users-json`);
