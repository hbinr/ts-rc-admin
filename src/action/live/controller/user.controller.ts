import 'reflect-metadata'

import { Body, Get, JsonController, Param, Post } from "@blued-core/http-server";

import { UserService } from '@service/user'
import { UserRequest } from '@service/user/types';
import Container, { Service } from 'typedi';
@Service()
@JsonController('/users')
export class UserController {

  private userService: UserService

  constructor() {
    this.userService = Container.get(UserService)
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    // 需要使用 await 修饰， 不能直接 this.userService.findUserByID(id)
    const data = await this.userService.getUserByID(id)

    // 第一次写，返回类型为：Promise<UserDTO> ， return data 即可
    // 后来根据公司代码习惯改成return {data}，是因为要返回专门的响应对象 {code:200, request_time,response_time, data{}}
    //  return {} 这样也会返回响应 {code:200, request_time,response_time, ...data}
    return { data }
  }

  @Get()
  async listUsers() {
    const data = await this.userService.listUsers()
    return { data }
  }

  @Post()
  async createUser(@Body() req: UserRequest) {
    try {
      this.userService.createUser(req)
    } catch (error) {
      console.log('create user error: ', error);
    }
  }
}