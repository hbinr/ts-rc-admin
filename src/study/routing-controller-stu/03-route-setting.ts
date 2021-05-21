import { Context } from 'koa';
import { JsonController, Get, Ctx } from 'routing-controllers';

// 1. group route：向控制器装饰器传递 根路由参数 ，控制器下的路由将添加该跟路由前缀，记得不要忘记加'/'
@JsonController('/route')
export class UserRouteSetController {

    @Get('/setting')
    getUser(@Ctx() context: Context) {
        return JSON.stringify(context)
    }
}


// 2. global route 要为所有路由添加前缀，比如 /api，可以使用 createKoaServer中的routePrefix 配置项
