/**
 * 增删改查，内容要点：
 * 1. 使用 sequelize 进行CURD操作
 * 2. 增加: create 方法,该 build(创建实例,类似new)方法和 save(插入数据) 方法合并为一个方法
 * 3. 修改
 * 4. 删除
 * 5. 查询
 * 6. 记录实例: jane.toJSON(), 自动保证实例被 JSON.stringify 编辑好
 *
 */

import { User } from './02-model-define';
import * as sequelize from 'sequelize';
import { Op } from 'sequelize';

export async function UserCURD(): Promise<string> {
  // 1. 增加
  const interDHB = await User.create({ firstName: 'hb', lastName: 'duan' })
  console.log('interDHB: ', interDHB.toString());

  // 2. 修改
  const updateDHB = await User.update({
    firstName: 'ronger'
  }, {
    where: {
      id: 1
    }
  })
  console.log('updateDHB: ', updateDHB.toString());

  // 3. 删除 返回值为影响的行数
  const deleteDHB = await User.destroy({
    where: {
      id: 2
    }
  })


  return deleteDHB.toString()
}

// 4. 查询
export async function queryData(): Promise<Object> {
  // 1. 查询一个
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` LIMIT 1;
  const one = await User.findOne()

  // 2. 查询所有
  const all = await User.findAll()

  // 3. SELECT 查询指定属性(字段)
  // select id,firstName from Users
  const customProperties = await User.findAll({
    attributes: ['id', 'firstName']
  })

  // 4. 使用嵌套数组来重命名属性
  // select id,firstName as name from Users
  const customPropertyAlias = await User.findAll({
    attributes: ['id', ['firstName', 'name']]
  })

  // 5. 使用 sequelize.fn 进行聚合，使用聚合函数count，需要对数据进行分组
  //  SELECT `id`, COUNT(`firstName`) AS `n_firstName` FROM `Users` AS `User` GROUP BY `id`;
  const useFuncCount = await User.findAll({
    attributes: [
      'id',
      // 使用聚合函数时,必须为它提供一个别名,以便能够从模型中访问它
      [sequelize.fn('COUNT', sequelize.col('firstName')), 'n_firstName'],
    ],
    group: 'id'
  })


  // 6. 指定where条件 = 
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //        WHERE `User`.`id` = 1;
  const opEqCondition = await User.findAll({
    where: {
      id: 1
    }
  })
  // 等效于以下代码
  const id = 1
  const opEqCondition2 = await User.findAll({
    where: {
      id
    }
  })

  // 7. 指定where条件  = 和and  
  //  SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //         WHERE `User`.`id` = 1 AND `User`.`firstName` = 'ronger';
  const opEqAndCondition = await User.findAll({
    where: {
      id: 1,
      firstName: 'ronger'
    }
  })


  // 8. 指定where条件 = 和 or， 单个字段
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //        WHERE (`User`.`id` = 1 OR `User`.`id` = 5);
  const opEqOrCondition = await User.findAll({
    where: {
      id: {
        [Op.or]: [1, 5]
      }
    }
  })

  // 8. 指定where条件 = 和 or, 多个字段
  //  SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //         WHERE (`User`.`id` = 5 OR `User`.`firstName` = 'ronger');
  const opEqOrMutilPropertyCondition = await User.findAll({
    where: {
      [Op.or]: [{ id: 5 }, { firstName: 'ronger' }]
    }
  })

  // 9. 指定where条件 in, 单个字段
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User`
  //        WHERE `User`.`id` IN (1, 3, 5);
  const opInPropertyCondition = await User.findAll({
    raw: true, // 原始数据格式：[{字段1:字段1值...},{字段1:字段1值...},{字段1:字段1值...}]
    where: {
      id: [1, 3, 5]
    }
  })

  // 10. 执行多条 sql， count() 和 select
  // SELECT count(*) AS `count` FROM `Users` AS `User` WHERE `User`.`id` > 2;
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`id` > 2;
  const { count, rows } = await User.findAndCountAll({
    raw: true,
    where: {
      id: {
        [Op.gt]: 2
      }
    }
  })
  const data = rows.map(item => ({
    id: item.id,
    firsName: item.firstName + '_test'
  }))

  return JSON.stringify(data)
}