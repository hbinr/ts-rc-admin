import { Service } from 'typedi';

import User from '@model/User'

import { IUserRepository } from './user-interface.repository';
@Service()
export class UserRepo implements IUserRepository {



  async create(user: User): Promise<void> {
    // 版本是 6.6.2 情况下，以下两种方式都失败：
    // 1. 直接传递对象，调用API
    // await User.create(user)
    // 2. 构造对象，调用API1
    // await User.create({
    //   userID: user.userID,
    //   userName: user.userName,
    //   ...more props
    // })

    // 版本是 4.44.3，以下两种方式成功

    // 方式一：
    // await User.create({
    //   userID: user.userID,
    //   userName: user.userName,
    //   ...
    // })

    // 方式二：
    await User.create(user.toJSON())

    // 失败：但是以下调用方式还是失败， 因为user 对象是Promise对象，里面有很多属性
    // await User.create(user)
  }

  async findAll(): Promise<User[]> {
    return await User.findAll({ raw: true })
  }

  async findByID(id: number): Promise<User> {
    return await User.findByPk(id, { raw: true })
  }

  async findByEmail(email: string): Promise<User> {
    return await User.findOne({
      where: {
        email,
      },
      raw: true,
    })
  }
  async findByPhone(phone: string): Promise<User> {
    return await User.findOne({
      where: {
        phone,
      },
      raw: true,
    })
  }

}