function classifier(input) {
  const result = {}

  const modifiedArray = [...input];

  if (modifiedArray.length == null || modifiedArray.length == false ) {

      result.noOfGroups = 0

      return result;

  }



  if (typeof input !== 'object') {

      throw new Error('Invalid Input')
  }

  const modifiedArr2 = modifiedArray.map((student) => {

      student.age = new Date().getFullYear() - new Date(student.dob).getFullYear()

      return student

  }).sort((a, b) => a.age - b.age);

  const mainArray = [];

  let members = [];

  members.push(modifiedArr2[0])

  for (let i = 1; i < modifiedArr2.length; i++) {

      if (modifiedArr2[i].age - members[0].age <= 5 && members.length < 3) {

          members.push(modifiedArr2[i])

      } else {

          mainArray.push(members);

          members = [];

          members.push(modifiedArr2[i]);

      }

  }

  if (members.length > 0) {

      mainArray.push(members)
  }

  result.noOfGroups = mainArray.length

  for (let i = 0; i < mainArray.length; i++) {

      let groupName = `group${i + 1}`


      result[groupName] = {

          members: mainArray[i],

          oldest: mainArray[i][mainArray[i].length - 1].age,

          sum: mainArray[i].reduce((acc, curr) => acc += curr.age, 0),

          regNos: mainArray[i].map(student => {

              return parseInt(student.regNo);

          }).sort((a, b) => a - b),
      }
  }
  return result;

}

export default classifier;
