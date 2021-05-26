import { Get, JsonController, Param } from "@blued-core/http-server";
import Container, { Inject, Service } from "typedi";

import {
  UserDTO,
  UserService
} from '../service/user'

console.log('UserService: ', UserService);

@Service()
@JsonController('/users')
export default class {
  // @Inject()  // 不生效 改用 Container.get()
  // private userService: UserService
  private userService = Container.get(UserService)
  @Get('/get/:id')
  async getUser(@Param('id') id: number) {
    // 需要使用 await 修饰， 不能直接 this.userService.findUserByID(id)
    const data = await this.userService.findUserByID(id)

    // 第一次写，返回类型为：Promise<UserDTO> ， return data 即可
    // 后来根据公司代码习惯改成return {data}，是因为要返回专门的响应对象 {code:200, request_time,response_time, data}
    //  return {} 这样也会返回响应 {code:200, request_time,response_time}
    return { data }

  }
}