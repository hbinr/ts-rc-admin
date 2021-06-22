export class User {
    name: string
}

async function inviteListService() {
    const users: User[] = []
    for (let i = 0; i < 3; i++) {
        const user = new User()
        user.name = String(i + 1)
        users.push(user)
    }
    console.log('inviteListService ', users);

    return await getLiveAudiences(users)
}

async function getLiveAudiences(users: User[]): Promise<User[]> {

    let userList:User[] = []
    // for (const [i, u] of users.entries()) { // 同下; 千万不要用forEach, 会乱序
    for (let i = 0; i < users.length; i++) {
        const user = new User()
        user.name = String(i)+ await getName()
        userList.push(user)
    }

    return userList
}

async function getName() {
    return ' one'

}

async function test() {
    const res = await inviteListService()
    console.log('res ',res);
}

test()
