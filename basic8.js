const Person = require("./basic7");

class Pet extends Person {
    // get location()
    // {
    //     super.location
    // }
    constructor(firstName,lastName){
        super(firstName,lastName)
    }
}

let pet = new Pet("sam","ta")
console.log(pet.fullName())
console.log(pet.location)
