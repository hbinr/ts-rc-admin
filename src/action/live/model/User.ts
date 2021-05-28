import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'user'
})
export default class User extends Model<User>{

  @Column({
    comment: '用户ID',
    allowNull: false,
    field: 'user_id',
  })
  userID: string

  @Column({
    comment: '用户名',
    allowNull: false,
    field: 'user_name'
  })
  userName: string

  @Column({
    comment: '密码',
    allowNull: false
  })
  password: string

  @Column({
    comment: '邮箱',
    allowNull: false
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
    field: 'role_name',
    defaultValue: 'No role'
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
    field: 'updated_at'

  })
  updatedAt: Date
}