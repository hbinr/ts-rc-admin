import { JsonController, Body, Post, BodyParam } from 'routing-controllers';

class User {
    id: number
    name: string
    age: number
}

/**
 * @Body 学习，内容要点: 
 * 1. 如果对 @Body() 装饰的参数声明了类的类型，
 * 2. routing-controllers 将使用 class-transformer 去实例化请求 Body 的数据。
 * 3. 在创建服务时配置 { classTransformer: false } 可以禁用该行为。
 */
@JsonController()
export class UserBodyController {

    @Post('/users-body')
    saveUser(@Body() user: User) {
        console.log('user: ', user);
        return JSON.stringify(user)
    }

    @Post("/users-bodyparam")
    updateUser(@BodyParam("name") userName: string) {
        let user = new User()
        if (userName === 'tom') {
            user.name = userName
        }
        user.id = 1
        user.name = 'bob'
        return JSON.stringify(user)
    }

}