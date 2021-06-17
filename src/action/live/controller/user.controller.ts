import { Body, Get, JsonController, Param, Post } from "@blued-core/http-server";

import { UserService } from '@service/user'
import { UserRequest } from '@service/user/types';
import Container, { Service } from 'typedi';
import { ResultCode } from '@common/constant/result-code';
import ApiResultBuild from '@common/response/response-build';
@Service()
@JsonController('/users')
export class UserController {

  private userService: UserService

  constructor() {
    this.userService = Container.get(UserService)
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    let data = {}

    try {
      const user = await this.userService.getUserByID(id)
      data = new ApiResultBuild().success(user, ResultCode.SUCCESS)
    } catch (e) {
      data = new ApiResultBuild().fail(e.code)
    }

    return { data }
  }

  @Get()
  async listUsers() {
    let data = {}

    try {
      const users = await this.userService.listUsers()
      data = new ApiResultBuild().success(users, ResultCode.SUCCESS)
    } catch (e) {
      data = new ApiResultBuild().fail(ResultCode.SYSTEM_INNER_ERROR)
    }

    return { data }

  }

  @Post()
  async createUser(@Body() req: UserRequest) {
    let data = {}

    try {
      const user = await this.userService.createUser(req)
      data = new ApiResultBuild().success(user, ResultCode.SUCCESS)
    } catch (e) {
      data = new ApiResultBuild().fail(e.code)
    }

    return { data }
  }
}