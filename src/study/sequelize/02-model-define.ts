/**
 * 模型 model 定义，内容要点：
 * 1. 所谓模型，对应到mysql中就是建立表结构
 * 2. Sequelize 中可以用两种等效的方式定义模型，不使用TypeScript:
 *    a. 调用 sequelize.define(modelName, attributes, options)
 *    b. 扩展 Model 并调用 init(attributes, options)
 * 3. TypeScript + 定义模型: 主要是通过装饰器
 *   
 * 4.DataType 在 ts 中，导入的模块不是 'sequelize/types'
 */

import { userInfo } from 'os';
import { Model, Table, Column, DataType } from 'sequelize-typescript'
import { globalSequelize } from "./01-init-db";

// 定义方式一: 调用 sequelize.define

export const User = globalSequelize.define('User', {
  // 在这里定义模型属性
  firstName: {
    type: DataType.STRING,
    allowNull: false
  },
  lastName: {
    type: DataType.STRING
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数，可选参数
});
console.log(User === globalSequelize.models.User); // true


// 定义方式二: 继承 Model

// export class User2 extends Model<User2>
// User2.init({
//   // 在这里定义模型属性
//   firstName: {
//     type: DataType.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataType.STRING
//     // allowNull 默认为 true
//   }
// }, {
//   // 这是其他模型参数
//   sequelize: globalSequelize, // 我们需要传递连接实例
//   modelName: 'User2' // 我们需要选择模型名称
// })

// 定义的模型是类本身


// 定义方式三: 继承Model + 使用装饰器

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
    allowNull: false
  })
  name: string
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

globalSequelize.sync();
console.log("所有模型均已成功同步.");

// User.drop();
// console.log("用户表已删除!");

// globalSequelize.drop();
// console.log("所有表已删除!");