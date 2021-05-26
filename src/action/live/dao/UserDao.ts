import { Service } from 'typedi'
import User from '../model/User'

@Service()
export class UserDao {

  async findUserByID(id: number): Promise<User> {
    console.log('UserDao.findUserByID');
    const user = await User.findByPk(id, { raw: true })
    // 不直接 return User.findByPk(id, { raw: true }) 的原因
    // 因为是异步操作，需要await修饰来等待函数执行完成
    // 而且如果使用 常量/变量 Promise 对象，会提升性能，使 await()函数能够给同时执行，而不是同步执行
    return user
  }

}