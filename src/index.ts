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


// 创建Koa应用，注册所有控制器路由并返回Koa实例
const app = createKoaServer({
    routePrefix: '/v1/api',
    // 声明需要使用的控制器
    controllers: [
        UserJsonController,
        UserCtxController,
        UserRouteSetController,
        UserParamQueryController,
        UserBodyController
    ],
});

// 在3000端口运行Koa应用
app.listen(3000);


console.log(`应用启动成功 访问: http://127.0.0.1:${PORT}/users-json`);
