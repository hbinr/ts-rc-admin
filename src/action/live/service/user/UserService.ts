import { Inject, Service } from 'typedi'

import { UserDTO } from './types/UserDTO';
import User from '../../model/User';
import { UserDao } from '../../dao/UserDao';

@Service()
export class UserService {

  @Inject()
  private userDao: UserDao


  async createSlow(): Promise<void> { }

  // await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样. 因为大量await的 promises 相继发生而变慢
  // 有一种模式可以缓解这个问题——通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕
  // createFast = async (params: string): Promise<User> => {
  //   return null
  // }

  async findUserByID(id: number): Promise<UserDTO> {
    const user = await this.userDao.findUserByID(id)
    return buildUserDTO(user)
  }

}

function buildUserDTO(user: User): UserDTO {
  let res = new UserDTO()
  res.id = user.id
  res.userID = user.userID
  res.userName = user.userName
  res.phone = user.phone
  res.email = user.email
  res.roleName = user.roleName
  return res
}
