/**
 * Finders, sequelize 提供的便捷查找方法，内容要点：
 * 1. findAll()
 * 2. findOne() 返回查询到第一条数据, limit 1
 * 3. findByPk() 根据主键查询 where id = ?, 没有值则返回 nul
 * 4. findOrCreate()  除非找到一个满足查询参数的结果,否则方法 findOrCreate 将在表中创建一个条目
 *    a. 返回值： 找到的实例或创建的实例  | 布尔值，指示该实例是已创建还是已经存在.
 *    b. where  参数来查找条目
 *    c. defaults 参数来定义必须创建的内容
 * 5. findAndCountAll()  结合了 findAll 和 count,处理与分页有关的查询时非常有用, 返回
 *    a. count  一个整数 - 符合查询条件的记录总数
 *    b. rows   一个数组对象 - 获得的记录
 */

import { User } from './02-model-define'

export async function Finders(): Promise<string> {
  // 1. 根据主键查询
  const findByPk = await User.findByPk(1)

  // 2. 先查询，差不到就创建
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`id` = 2;
  // INSERT INTO `Users` (`id`,`firstName`,`lastName`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?);
  const [user, isCreate] = await User.findOrCreate({
    where: { id: 2 },
    defaults: {
      firstName: 'dan hua',
      lastName: 'Mu'
    }
  })

  if (isCreate) {
    console.log('isCreate: ', isCreate);
  }


  // 3. findAndCountAll 
  const { count, rows } = await User.findAndCountAll({
    where: {
      lastName: 'duan'
    },
    limit: 5,
    offset: 3
  })
  return JSON.stringify(rows)
}
