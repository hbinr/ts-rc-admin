import { IsAlpha, IsBoolean, IsEnum, IsPositive } from 'class-validator';
import { Controller, Get, Param, QueryParam, QueryParams } from 'routing-controllers';


enum Roles {
    Admin = "admin",
    User = "user",
    Guest = "guest",
}

// 通过 class-validator 模块，为这些参数执行校验。
class GetUsersQuery {

    @IsPositive()
    limit: number;

    @IsAlpha()
    city: string;

    @IsEnum(Roles)
    role: Roles;

    @IsBoolean()
    isActive: boolean;

}


@Controller('/arg')
export class UserParamQueryController {
    // 1. param 用 @Param 装饰器注入 param 参数
    // http://127.0.0.1:3000/v1/api/arg/param/1
    @Get('/param/:id')
    getUser(@Param('id') id: number) {
        return 'Param: id is :' + id
    }

    // 2. 用 @QueryParam 装饰器注入 query 参数：
    // http://127.0.0.1:3000/v1/api/arg/query?id=1&age=19
    @Get('/query')
    getParam(
        @QueryParam('id') id: string,
        @QueryParam('age') age: number) {

        return `QueryParam: id is ${id}, age is ${age}`
    }

    // 3.  @QueryParams() 装饰器可以注入所有 query 参数。多了个 's'
    // 一般对象格式的参数传递，目前都默认使用 JSON
    // http://example.com/path?name=Branch&products=[Journeys,Email,Universal%20Ads]
    @Get("/usersquery")
    getUsers(@QueryParams() query: GetUsersQuery) {
        // 这里可以访问query.role、query.limit
        // 以及其它已校验的query参数

        return `QueryParams: query.role->${query.role}, query.limit->${query.limit}`
    }
}