/**
 * 中间件学习，内容要点: 
 * 1. @Middleware 装饰器用于自定义中间件，
 * 2. @UseBefore 和 @UseAfter 装饰器使用任何已有的或自定义的 express / Koa 中间件。
 * 3. 用于方法：
 *    a. @UseBefore(compression())
 *       getOne(@Param("id") id: number) {}
 *    b. 上述 compression 中间件只在路由方法执行 前 执行，要在方法执行 后 执行中间件，应使用 @UseAfter。
 * 4. 用于Controller：
 *    a. @Controller()
         @UseBefore(compression())
         export class UserController {}
 *    b. 应用于 UserController 控制器下所有方法，且在方法执行前执行。
 * 5. 用于全局：
 *    a. app.use(compression());
 *   
 */
import { Controller, Get, Param, UseBefore } from 'routing-controllers';

// 1. 导入中间件
let compression = require('compression')

@Controller()
@UseBefore(compression()) // 2. 应用于 UserMiddlewareController 的下的所有方法
export class UserMiddlewareController {

  @Get('/users-middleware/:id')
  @UseBefore(compression()) // 3. 或只应用于 getID() 方法
  getID(@Param('id') id: number) {
  }
}