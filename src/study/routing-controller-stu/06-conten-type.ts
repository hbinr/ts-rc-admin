/**
 * @ContentType 学习，内容要点: 
 * 1. 为路由设置  ContentType
 * 2. 支持：text/cvs , text/html, application/json 等等
 * 
 */
import { Controller, Body, Post, ContentType } from 'routing-controllers';

class User {
    id: number
    name: string
    age: number
}

@Controller()
export class UserContentTypeController {

    @Post('/users-content-type')
    @ContentType("application/json ")
    saveUser(@Body() user: User) {
        console.log('user: ', user);
        return JSON.stringify(user)
    }
}