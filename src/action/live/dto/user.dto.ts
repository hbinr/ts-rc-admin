export class UserDto {
  id!: number
  userID!: number
  userName!: string
  constructor(obj: Partial<UserDto>) {
    // 所有可枚举的自身属性的值从一个或多个源对象(obj)复制到一个
    // 目标对象。返回目标对象(this)
    Object.assign(this, obj)
  }
}