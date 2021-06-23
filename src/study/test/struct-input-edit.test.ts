export class User {
    id: number
    name: string
}

async function inviteListService() {
    const users: User[] = []
    for (let i = 0; i < 6; i++) {
        const user = new User()
        user.id = i + 1
        if (i %2 == 0) {
            user.name = 'tom'
        } else {
            user.name = 'bob'
        }
        users.push(user)
    }

    return users
    // return await getLiveAudiences(users)
}
class UserNew{
    id: number
    name: string
    joinLiveTime: number
    constructor(obj: Partial<UserNew>) {
        Object.assign(this, obj)
    }
}
async function orderUser(users: User[]):Promise<UserNew[]> {
    let newUserList:UserNew[]=[]
    for (let i = 0; i < users.length; i++) {
        let newUser = new UserNew(users[i])
        newUser.joinLiveTime = Math.random()*1000
        newUserList.push(newUser)
    }
    newUserList.sort(mySort)

    return newUserList

}

function mySort(cur:any, next:any) {
    if(cur.id !== next.id) return cur.id > next.id ? -1:1
    else if(cur.name !== next.name) return cur.name > next.name ? -1:1
    else if(cur.joinLiveTime !== next.joinLiveTime) return cur.joinLiveTime > next.joinLiveTime ? -1:1
}

async function getLiveAudiences(users: User[]): Promise<User[]> {

    let userList: User[] = []
    // for (const [i, u] of users.entries()) { // 同下; 千万不要用forEach, 会乱序
    for (let i = 0; i < users.length; i++) {
        const user = new User()
        user.id = i + 1
        user.name = String(i) + await getName()
        userList.push(user)
    }

    return userList
}

async function getName() {
    return ' one'

}

async function test() {
    const res = await inviteListService()
    console.log('res ', res);

    const newRes = await orderUser(res)
    console.log('orderUser ', newRes);

}

test()
