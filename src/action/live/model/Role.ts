import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'role'
})
export default class Role extends Model<Role>{
  @Column({
    comment: '主键ID',
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    comment: '角色名称',
  })
  name: number

  @Column({
    comment: '角色首字母缩写'
  })
  initials: string;

  @Column({
    comment: '创建时间'
  })
  createdAt: Date

  @Column({
    comment: '修改时间'
  })
  updatedAt: Date
}