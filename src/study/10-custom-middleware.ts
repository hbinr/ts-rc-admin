/**
 * 自定义中间件学习，内容要点: 
 * 1. 我们可以自定义中间件，实现自己的逻辑
 * 2. 
 * 3. 实现 koa.js 的中间件，两种方式：
 *    a. 声明一个简单的中间件函数
 *    b. 声明一个类，继承 KoaMiddlewareInterface 接口
 *      该接口只有一个函数签名：
 *      use(context: any, next: (err?: any) => Promise<any>): Promise<any>;
 * 4. 全局中间件在所有请求之前执行，必须在 routing-controllers 初始化时指定要使用的全局中间件
 *    用 @Middleware 装饰器创建全局中间件并声明该中间件是在控制器方法之前还是之后执行
 */
import { Controller, Get, KoaMiddlewareInterface, Param, UseAfter, UseBefore, Middleware } from 'routing-controllers';

// 方式二：声明一个类 
// 注意：由于JavaScript是解释型语言，所以先定义class，后才能使用，不需要编译型语言，不分定义顺序
@Middleware({ type: 'before' })  // 创建全局中间件并声明该中间件是在控制器方法之前执行
class MyMiddleware implements KoaMiddlewareInterface { // 接口声明可选

  use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    console.log("MyMiddleware do something before execution...");
    return next().then(() => {
      console.log("MyMiddleware do something after execution");
    }).catch(error => {
      console.log("MyMiddleware error handling is also here");
    });
  }
}

@Controller()
export class UserCustomMiddlewareController {
  @Get('/users-custom-middlware/:id')
  // @UseBefore(loggingMiddleware)
  @UseAfter(MyMiddleware)  // 更推荐在全局中使用，这里只是简单测试
  getID(@Param('id') id: number) {
    return id
  }
}


// 方式一：声明一个简单的中间件函数
function loggingMiddleware(context: any, next: (err?: any) => Promise<any>): Promise<any> {
  console.log('loggingMiddleware do something before execution...');
  return next()
    .then(() => {
      console.log('loggingMiddleware do something after execution');
    })
    .catch(error => {
      console.log('loggingMiddleware error handling is also here');
    });
}
