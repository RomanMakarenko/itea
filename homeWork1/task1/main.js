const min = require('./min');
const sum = require('./sum');
const abs = require('./abs');

const array1 = [1,2,3,4,-3,5,6,7];
const someNumber = -3;
console.log(`Minimum value from array = ${min(array1)}`);
console.log(`Sum of all elements in array = ${sum(array1)}`);
console.log(`Module value of number = ${abs(someNumber)}`);