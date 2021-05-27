// 导入顺序1: 外部模块
import { Inject, Service } from 'typedi'
import { Md5 } from 'ts-md5/dist/md5';

// 导入顺序2: 内部模块-业务
import { UserRepo } from '@repository/UserRepo';

// 导入顺序3: 父目录中的模块-通用
import User from '@model/User';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@common/http/HttpStatus';

// 导入顺序4: 来自相同或兄弟目录的模块
import { UserRequest } from './types/UserRequest';

@Service()
export class UserService {

  @Inject()
  private userRepo: UserRepo

  async create({
    userName,
    email,
    password,
    phone,
    roles
  }: UserRequest): Promise<User> {

    if (this.userRepo.isUserNameExist(userName)) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, '用户名已存在')
    }

    if (this.userRepo.isEmailExist(email)) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, '邮箱已存在')
    }


    if (this.userRepo.isPhoneExist(phone)) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, '手机号已存在')
    }

    let user: User = new User()
    user.userName = userName
    user.email = email
    user.phone = phone
    user.password = Md5.hashStr(password)
    user.roles = roles

    const newUser = await this.userRepo.create(user)
    delete newUser.password

    return newUser
  }

  // await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样. 因为大量await的 promises 相继发生而变慢
  // 有一种模式可以缓解这个问题——通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕


  async findUserByID(id: number): Promise<User> {
    return await this.userRepo.findUserByID(id)
  }

}
