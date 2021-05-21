/**
 * 管理空响应学习，内容要点: 
 * 1. 对于返回 void 或 Promise<void> 或 undefined 的控制器方法，将自动向客户端抛出 404 错误。
 *    可以用 @OnUndefined 装饰器设置这种情况下的状态码。
 * 2. 指定状态码：
 *      a. 204: 成功响应，但是没有内容返回
 *      b. 404: not found 
 * 3. 当结果为 undefined 时也可以返回一个错误类，会有具体的错误堆栈都输出
 * 4.器方法返回  如果控制null 可以用 @OnNull 装饰器替代，同样也需要指定状态码
 */
import { Controller, Delete, Get, HttpError, OnNull, OnUndefined, Param } from 'routing-controllers';

class UserNotFoundErr extends HttpError {
    constructor() {
        super(404, 'User not found')
    }
}

@Controller()
export class UserVoidRespController {

    @Delete('/users-void-resp/:id')
    @OnUndefined(204)  // 指定状态码
    async remove(@Param('id') id: number): Promise<void> {
        console.log('id: ', id);
    }


    // 下面例子中，当用户 id 不存在时 findOneById 返回 undefined该路由将返回 404 代码，
    // 如果存在则返回 200 代码：
    @Get('/users-on-undefined/:id')
    @OnUndefined(404)
    getUserID(@Param('id') id: number) {
        if (id === 1) {
            return 1
        } else {
            return undefined
        }
    }


    // 当结果为 undefined 时也可以返回一个错误类
    @Get('/users-on-undefined-customerr/:id')
    @OnUndefined(UserNotFoundErr)
    getUser(@Param('id') id: number) {
        if (id === 1) {
            return 1
        } else {
            return undefined
        }
    }

    // 当结果为 undefined 时也可以返回一个错误类
    @Get('/users-on-null/:id')
    @OnNull(500)
    getUserNull(@Param('id') id: number) {
        if (id === 1) {
            return 1
        } else {
            return null
        }
    }
}