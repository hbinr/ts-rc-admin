
/**
 * Object.keys()  返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
 * 1. 单对象，返回的数组元素都是 属性名
 * 2. 对象list
 */

// 构建对象
class User {
  userID: number
}

let user1 = new User()
user1.userID = 1

let user2 = new User()
user2.userID = 1

let userList = [user1, user2]
console.log('userList: ', userList);

// 单对象, 返回的数组元素都是 属性名
console.log('Object.keys: ', Object.keys(user1));    // [ 'userID' ] 

// 对象list, 返回数组元素是每个对象的下标
console.log('Object.keys: ', Object.keys(userList)); // [ '0', '1' ] 字符串数组

// 核心实例
console.log('Object.keys number: ', Object.keys(userList).map(Number)); // [ 0, 1 ]