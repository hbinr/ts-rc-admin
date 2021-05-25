/**
 * 原始查询，内容要点：
 * 1. 使用 sequelize.query() 可以直接执行 SQL，参数返回格式是数组，可结构两个参数：
 *    a. 一个结果数组
 *    b. 一个包含元数据(例如受影响的行数等)的对象，元数据都是具体的方言. 比如是MySQL和MSSQL的查询元数据不一样
 * 2.  query() 的第二个参数是一个对象，有很多字段供选择：
 *    a. type: QueryTypes.SELECT 如果不需要访问元数据，那么可以指定本次sql执行的类型
 *    b. raw: true  返回原始数据
 *    c. 模型
 * 3. 防 SQL 注入。参数位置使用 ? 来占
 *
 */
import { QueryTypes } from "sequelize"
import { globalSequelize } from "./01-init-db"
import { UserInfo } from "./02-model-define"


const selectAllSQL = `select * from Users`

export async function RawQueries(): Promise<string> {
  // 1. 直接执行原始 sql
  const [results, metadata] = await globalSequelize.query(selectAllSQL)
  // console.log('metadata: ', metadata);  // 输出一模一样
  // console.log('results: ', results);    // metadata 和 results输出一模一样

  // 2. query() 第二个参数，指定SQL类型：query, insert, update, delete
  const userResults = await globalSequelize.query(selectAllSQL,
    { type: QueryTypes.SELECT } // 指定SQL类型为 query
  )
  const userResults2 = await globalSequelize.query(selectAllSQL, { raw: true })

  // 3. 传递模型
  // Callee 是模型定义. 这样你就可以轻松地将查询映射到预定义的模型
  // const userInfos = await globalSequelize.query(`select * from user_info`, {

  //   mapToModel: true, // 如果你有任何映射字段,则在此处传递 true

  //   model: UserInfo  // 现在,`userInfos` 的每个元素都是 UserInfo 的一个实例
  // });


  // 4. 防 SQL 注入。参数位置使用 ?
  const userResults3 = await globalSequelize.query(`select * from Users where id = ? `, {
    type: QueryTypes.SELECT,
    replacements: [1] // 参数类型必须为数组，按照它们在数组中出现的顺序被替换
  })

  return JSON.stringify(userResults3)
}
