

module.exports = class Person
{
    age = 25

    //get method
    get location(){
        return "Canada"
    }

    //constructor
    constructor(firstName,lastName){
        this.firstName = firstName
        this.lastName = lastName
    }

    //mmethod
    fullName(){
        console.log(this.firstName+" "+this.lastName)
    }

}

// let person = new Person("Tim","Turner")
// let person1 = new Person("John","Oliver")
// console.log(person.age)
// console.log(person.location)
// console.log(person.fullName())
// console.log(person1.fullName())