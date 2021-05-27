import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'user'
})
export default class User extends Model<User>{
  @Column({
    comment: '主键ID',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    comment: '用户ID',
    allowNull: false,
    field: 'user_id'
  })
  userID: number

  @Column({
    comment: '用户名',
    allowNull: false,
    field: 'user_name'


  })
  userName: string

  @Column({
    comment: '密码',
    allowNull: false
    // TODO 增加 hook 函数, 密码加密  service 层做?
  })
  password: string

  @Column({
    comment: '密码',
    allowNull: false
    // TODO 增加 hook 函数, 邮箱验证 service 层做?
  })
  email: string

  @Column({
    comment: '手机号',
    allowNull: false
  })
  phone: string

  @Column({
    comment: '角色名称',
    allowNull: false,
    field: 'role_name'

  })
  roles: string;

  @Column({
    comment: '创建时间',
    allowNull: false,
    field: 'created_at'

  })
  createdAt: Date

  @Column({
    comment: '更改时间',
    allowNull: false,
    field: 'updated_at'

  })
  updatedAt: Date

}