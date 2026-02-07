const num = 12345;

// split + map
const numSplit = String(num).split('').map(Number);
// console.log(numSplit);

// spread
const numSpread = [...String(num)].map(Number);
// console.log(numSpread);

// Array.from
const numArray = Array.from(String(num), Number);
// console.log(numArray);

// Object.keys()
const str = String(num);
const digits = Object.keys(str).map(key => +str[key]);
console.log(digits);