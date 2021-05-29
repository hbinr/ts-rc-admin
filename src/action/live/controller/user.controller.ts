import 'reflect-metadata'

import { Body, Get, JsonController, Param, Post } from "@blued-core/http-server";

import { UserService } from '@service/user'
import { UserRequest } from '@service/user/types';
import Container, { Service } from 'typedi';
import { ResultCode } from '../common/constant/result-code';
import AppResultBuild from '@common/response/response-build';
import { type } from 'os';
@Service()
@JsonController('/users')
export class UserController {

  private userService: UserService

  constructor() {
    this.userService = Container.get(UserService)
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    try {
      // 需要使用 await 修饰， 不能直接 this.userService.findUserByID(id)

      const user = await this.userService.getUserByID(id)
      const data = new AppResultBuild().success(user, ResultCode.SUCCESS)

      // 第一次写，返回类型为：Promise<UserDTO> ， return data 即可
      // 后来根据公司代码习惯改成return {data}，是因为要返回专门的响应对象 {code:200, request_time,response_time, data{}}
      //  return {} 这样也会返回响应 {code:200, request_time,response_time, ...data}
      return { data }
    } catch (error) {
      const data = new AppResultBuild().fail(ResultCode.SYSTEM_INNER_ERROR)
      console.log('getUser error: ', error);
      return { data }
    }

  }

  @Get()
  async listUsers() {
    try {
      const users = await this.userService.listUsers()
      const data = new AppResultBuild().success(users, ResultCode.SUCCESS)
      return { data }
    } catch (error) {
      const data = new AppResultBuild().fail(ResultCode.SYSTEM_INNER_ERROR)
      console.log('listUsers error: ', error);
      return { data }
    }
  }

  @Post()
  async createUser(@Body() req: UserRequest) {
    try {
      this.userService.createUser(req)
      const data = new AppResultBuild().successNoData(ResultCode.SUCCESS)
      return { data }

    } catch (error) {
      const data = new AppResultBuild().fail(ResultCode.SYSTEM_INNER_ERROR)
      console.log('createUser error: ', error);
      return { data }
    }
  }
}