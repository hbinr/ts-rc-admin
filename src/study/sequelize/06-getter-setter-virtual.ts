/**
 * Getters, Setters & Virtuals - 获取器, 设置器 & 虚拟字段，内容要点：
 * 1. Sequelize 允许你为模型的属性定义自定义获取器和设置器.
 * 2. Sequelize 还允许你指定所谓的 虚拟属性,它们是 Sequelize 模型上的属性,
 *    这些属性在基础 SQL 表中实际上并不存在,而是由 Sequelize 自动填充.
 *    它们对于简化代码非常有用.
 * 3. get()  获取值，然后再进行处理
 * 4. set()  设置 Sequelize 在将数据发送到数据库之前自动调用了设置器. 
 * 5. set() 和 get() 可以对同一个字段混合使用
 * 6. DataType.VIRTUAL  虚拟字段，顾名思义，在数据库中不存在的字段，类似DTO中，需要额外处理的传输字段s
 * 
 */



import { globalSequelize } from "./01-init-db"
import { Column, Model, Table, DataType } from "sequelize-typescript"
import { createHash } from "crypto"

// 1. get()/set() 应用， 方式一：使用 sequelize.define()
const User = globalSequelize.define('user', {
  // 假设我们想要以大写形式查看每个用户名,
  // 即使它们在数据库本身中不一定是大写的
  username: {
    type: DataType.STRING,
    get() {
      const rawValue = this.getDataValue('username');  // this.username 无效
      return rawValue ? rawValue.toUpperCase() : null;
    }
  }
})




// 2. get()/set() 应用，方式二：在装饰器 @Column 中定义，更推荐
@Table({
  tableName: 'user_info'
})
export class UserInfo extends Model<UserInfo>{
  @Column({
    comment: '自增ID',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  uid: number

  @Column({
    comment: '姓名',
    allowNull: false,
    // 在装饰器 @Column 中定义
    get() {
      const rawValue = this.getDataValue('username');
      return rawValue ? rawValue.toUpperCase() : null;
    }
  })
  name: string

  @Column({
    comment: '密码',
    allowNull: false,
    set(password: string) {
      this.setDataValue('password', MD5Hash(password))
      // 另一个字段也可以参与计算， 一般很少这样操作，只是举例
      // this.setDataValue('password', MD5Hash(this.getDataValue('username') + password))
    }
  })
  password: string

  @Column({
    comment: '年龄',
    defaultValue: 0
  })
  age: number

  @Column({
    comment: '性别',
  })
  gender: number
}

function MD5Hash(params: string) {
  return createHash('md5').update(params)
}

// 3. 虚拟字段 

export class UserForVirtual extends Model<UserForVirtual>{
  @Column
  firstName: string
  @Column
  lastName: string
  @Column({
    type: DataType.VIRTUAL,
    get() {
      //  下列代码报错
      // return `${this.firstName} ${this.lastName}`
    }
  })
  fullName: string
}

