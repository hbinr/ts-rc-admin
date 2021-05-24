/**
 * 排序、分组、限制、分页，内容要点：
 * 1. 排序 order: [['字段名','desc/esc']] , 注意是二维数组
 * 2. 分组 group: '字段名'
 * 3. 限制 limit 接收两个参数： (offset,limit)
 *    a. 第一个参数：第一个返回记录行的偏移量 ，初始记录行的偏移量是 0(而不是 1)
 *    b. 第二个参数：返回的数量
 * 4. 分页 offset
 *
 */
import { User } from './02-model-define'

export async function UserOrderAndGroup(): Promise<string> {
  // 1. order  默认升序(esc)
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //        ORDER BY `User`.`id` DESC;
  const allByOrderEsc = await User.findAll({
    order: [['id', 'DESC']]  // 降序
  })

  // 2. group 
  const allGroupByLastName = await User.findAll({
    group: 'lastName'
  })

  // 3. limit 
  const limit10 = await User.findAll({
    limit: 10
  })

  // 4. offset
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //        LIMIT 5, 10000000000000;
  const offset = await User.findAll({
    offset: 5  // 跳过前5个,返回剩余的
  })

  // 5. 跳过5个实例,然后获取5个实例
  // SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User` 
  //        LIMIT 5, 5;
  const limitAndOffset = await User.findAll({
    offset: 5,  // 偏移量为5，第5行之后的数据
    limit: 5    // 返回之后的5个
  })
  return JSON.stringify(limitAndOffset)
}
