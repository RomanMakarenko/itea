const customMath = require('math');

const array1 = [1,2,3,4,-3,5,6,7];
const someNumber = -3;
console.log(`Minimum value from array = ${customMath.min(array1)}`);
console.log(`Sum of all elements in array = ${customMath.sum(array1)}`);
console.log(`Module value of number = ${customMath.abs(someNumber)}`);