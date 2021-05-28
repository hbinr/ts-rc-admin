// 导入顺序1: 外部模块
import { Md5 } from 'ts-md5/dist/md5';
import { Service, Inject } from 'typedi';

// 导入顺序2: 内部模块-业务
import { UserRepo } from '@repository/user';

// 导入顺序3: 父目录中的模块-通用
import User from '@model/User';
import { HttpStatusError } from '@errors/http-status.error';
import { HttpStatus } from '@common/http/http-status';

// 导入顺序4: 来自相同或兄弟目录的模块
import { UserRequest } from './types';
import { IUserService } from './user-interface.service';
import { UserDto } from '@dto/user.dto';
import uuid from '@common/uuid/uuid';

@Service()
export class UserService implements IUserService {


  @Inject()
  private readonly userRepo: UserRepo

  async createUser({
    userName,
    email,
    password,
    phone,
    roles
  }: UserRequest): Promise<void> {

    const isUserNameExist = this.isUserNameExist(userName)
    if (await isUserNameExist) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, '用户名已存在')
    }

    const isEmailExist = this.isEmailExist(email)
    if (await isEmailExist) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, '邮箱已存在')
    }


    const isPhoneExist = this.isPhoneExist(phone)
    if (await isPhoneExist) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, '手机号已存在')
    }

    let user: User = new User()
    user.userName = userName
    user.userID = uuid()
    user.email = email
    user.phone = phone
    user.password = Md5.hashStr(password)
    user.roles = roles
    user.createdAt = new Date(Date.parse(new Date().toString()))

    // sequelize 中的所有SQL操作都是 async 函数，需要await修饰来等待函数执行完成。
    // 如果使用 常量/变量 接收Promise 对象，会提升性能，能够给异步执行，而不是同步执行

    await this.userRepo.create(user)
  }

  // await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样. 因为大量await的 promises 相继发生而变慢
  // 有一种模式可以缓解这个问题——通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕


  async getUserByID(id: number): Promise<UserDto> {
    const user = await this.userRepo.findByID(id)
    return new UserDto(user)
  }

  async listUsers(): Promise<UserDto[]> {
    const users = await this.userRepo.findAll()
    return users.map(user => new UserDto(user))
  }


  async isUserNameExist(userName: string): Promise<boolean> {
    let exists: boolean = false
    const user = await User.findOne({
      where: {
        userName
      }
    })


    if (Boolean(user)) {
      exists = true
    }

    return exists
  }

  async isEmailExist(email: string): Promise<boolean> {
    let exists: boolean = false
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (Boolean(user)) {
      exists = true
    }
    return exists
  }

  async isPhoneExist(phone: string): Promise<boolean> {
    let exists: boolean = false
    const user = await User.findOne({
      where: {
        phone
      }
    })
    if (Boolean(user)) {
      exists = true
    }
    return exists
  }
}
