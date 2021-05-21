import { Context } from 'koa';
import { JsonController, Get, Ctx } from 'routing-controllers';

@JsonController()
export class UserCtxController {

    @Get('/users-ctx')
    getUser(@Ctx() context: Context) {
        console.log(context);
        // koa2 的request 推荐使用。包含了前端传递过来的所有请求
        console.log('context.request: ', context.request);
        console.log('context req: ', context.req);  // 原生node的request
        return JSON.stringify(context)
    }
}