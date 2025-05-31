const Person = require('./basic7')

//object is collection of properties
// let person = {
//     firstName: 'Tim',
//     lastName: 'Turner',
//     age:24,
//     fullName: function(){ console.log(this.firstName+this.lastName)}
// }

// console.log(person.fullName())
// console.log(person.lastName)
// console.log(person['lastName'])
// console.log(person)
// console.log(typeof(person))

// person.gender = "Male"
// console.log(person)
// delete person.gender
// console.log(person)
// console.log('gender' in person)

let person = new Person("Chris", "Edward")
console.log(person.fullName())

