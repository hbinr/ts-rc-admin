class Exception{
    err! :string
}

async function throwExceptionReturnTest() {
    let e = new Exception()
    // e.err = 'test'
    // throw new Error('test err')
    return e
}
async function testThrowExceptionReturnTest() {
    console.log(await throwExceptionReturnTest())
}
testThrowExceptionReturnTest()