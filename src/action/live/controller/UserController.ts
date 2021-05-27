import { Body, Get, JsonController, Param, Post } from "@blued-core/http-server";
import Container, { Service } from "typedi";

import { UserService } from '@service/user'
import { UserRequest } from '@service/user/types';

@Service()
@JsonController('/users')
export default class {
  // 最上层使用 Container.get() 来注入实例，这样 @Inject()  UserDao 便能注入成功了
  private userService = Container.get(UserService)

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    // 需要使用 await 修饰， 不能直接 this.userService.findUserByID(id)
    const data = await this.userService.findUserByID(id)

    // 第一次写，返回类型为：Promise<UserDTO> ， return data 即可
    // 后来根据公司代码习惯改成return {data}，是因为要返回专门的响应对象 {code:200, request_time,response_time, data}
    //  return {} 这样也会返回响应 {code:200, request_time,response_time}
    return { data }
  }

  @Post()
  async createUser(@Body() req: UserRequest) {
    try {
      this.userService.create(req)

    } catch (error) {
      console.log('create user error: ', error);

    }
  }
}