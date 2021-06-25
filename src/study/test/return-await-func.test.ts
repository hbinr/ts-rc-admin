
async function getName() {
  return "Tom"
}

async function sayHi() {
  return getName()
}

async function testReturnAwait() {
  console.log('await sayHi(): ', await sayHi());
}

testReturnAwait()




