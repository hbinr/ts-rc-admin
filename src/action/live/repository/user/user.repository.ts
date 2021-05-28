
import User from '@model/User'
import { UserRepository } from '@repository/user/i.user.repository';

import { Service } from 'typedi';

@Service()
export class UserRepo implements UserRepository {

  async findByID(id: number): Promise<User> {
    // 优化 await User.findByPk(id) 写法
    const findById = User.findByPk(id, { raw: true, })
    return await findById
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