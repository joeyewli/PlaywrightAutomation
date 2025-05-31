//arrays

//create
let marks = Array(6)
let marks2 = new Array(1, 2, 3, 4, 5)
let marks3 = [1, 2, 3, 4, 5]

//access
console.log(marks3[2])//3
marks3[2] = 14
console.log(marks3)//1,2,14,4,5

//add extra array at the end
marks3.push(65)
console.log(marks3)//1,2,14,4,5,65

//remove array at the end
marks3.pop();
console.log(marks3)//1,2,14,4,5


//adds array to begining 
marks3.unshift(12);
console.log(marks3)//12,1,2,14,4,5

//subset of table between 2 index
subMarks = marks3.slice(2, 5)
console.log(subMarks) //2,14,4

//sum of array
let sum = 0
let total = marks3.reduce((sum, mark3) => sum + mark3, 0)
console.log(total)

//shows filtered results of array that matches conditions
let newFilterEvenMarks = marks3.filter(mark=>mark%2==0)
console.log(newFilterEvenMarks)

//map
let mappedArray = newFilterEvenMarks.map(mark=>mark*3)
console.log(mappedArray)

//chained 
let sumVal = marks3.filter(score=>score%2==0).map(score=>score*3).reduce((sum,val)=>sum+val,0)
console.log(sumVal)

//sorting
let fruits = ["Banana", "Mango", "Pomergrante", "Apple"]
fruits.sort()
console.log(fruits)

var scores = [12,003,19,16,14]
scores.sort()
console.log(scores)
//custom logic
scores.sort((a,b)=>a-b) //bubblesort
console.log(scores)
scores.sort((a,b)=>b-a) //bubblesort
console.log(scores)