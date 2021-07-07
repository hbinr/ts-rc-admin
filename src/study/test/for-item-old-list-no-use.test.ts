class Student {
  id: number
  name: string
}

function StudentFactory(): Student[] {
  const resList: Student[] = []

  for (let index = 0; index < 5; index++) {
    let s = new Student()
    s.id = index + 1
    s.name = "Hi " + String(index)

    resList.push(s)
  }

  return resList
}



function testNoUseItem() {
  const studentList = StudentFactory()

  for (const item of studentList) {
    item.id = 3
    item.name = "test no use"
  }

  console.log('studentList2:  ', studentList);
}


testNoUseItem()