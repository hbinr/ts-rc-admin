import os from 'os'

// 获取 hostname, 并且将 '-' 替换为 '.'
const hostname = os.hostname().replace(/-/g, '.')
console.log('hostname: ', hostname);           // xxxdeMacBook.Pro.local
console.log('os.hostname(): ', os.hostname()); // xxxdeMacBook-Pro.local