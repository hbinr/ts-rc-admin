// 导入顺序1: 外部模块
import { Md5 } from 'ts-md5/dist/md5';

// 导入顺序2: 内部模块-业务
import { UserRepo } from '@repository/user/user.repository';

// 导入顺序3: 父目录中的模块-通用
import User from '@model/User';
import { HttpStatusError } from '@errors/http-status.error';
import { HttpStatus } from '@common/http/http-status';

// 导入顺序4: 来自相同或兄弟目录的模块
import { UserRequest } from './types/user.request';
import { Service, Inject } from 'typedi';

@Service()
export class UserService {

  @Inject()
  private readonly userRepo: UserRepo

  async create({
    userName,
    email,
    password,
    phone,
    roles
  }: UserRequest): Promise<void> {

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

    // sequelize 中的所有SQL操作都是 async 函数，需要await修饰来等待函数执行完成。
    // 如果使用 常量/变量 接收Promise 对象，会提升性能，能够给异步执行，而不是同步执行

    // const executeCreate = this.userRepo.create(user)
    // await executeCreate
  }

  // await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样. 因为大量await的 promises 相继发生而变慢
  // 有一种模式可以缓解这个问题——通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕


  async findUserByID(id: number): Promise<User> {
    return await this.userRepo.findByID(id)
  }

}
