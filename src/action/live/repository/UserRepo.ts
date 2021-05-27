import { Repository } from 'sequelize-typescript';
import { Inject, Service } from 'typedi'

import User from '@model/User'


@Service()
export class UserRepo {
  async create(user: User): Promise<User> {
    return await User.create(user)
  }


  async findUserByID(id: number): Promise<User> {
    // 不直接 return User.findByPk(id, { raw: true }) 的原因
    // 因为是异步操作，需要await修饰来等待函数执行完成
    // 而且如果使用 常量/变量 接收Promise 对象，会提升性能，使 await()函数能够给异步执行，而不是同步执行
    return await User.findByPk(id, { raw: true })
  }

  async isUserNameExist(userName: string): Promise<Boolean> {
    let exists: Boolean = false
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

  async isEmailExist(email: string): Promise<Boolean> {
    let exists: Boolean = false
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

  async isPhoneExist(phone: string): Promise<Boolean> {
    let exists: Boolean = false
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