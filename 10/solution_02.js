// with help from https://dev.to/thibpat/solving-day-10-of-advent-of-code-2020-in-javascript-5ajo

const fs = require('fs');
let lines = [0].concat(fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x).map(x => parseInt(x)));
let testLines = [0].concat(fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x).map(x => parseInt(x)));

lines = lines.sort((a,b) => {
  return a - b;
})

// push the device built in adapter
lines.push(lines[lines.length-1] + 3);

function combination(array, memo={}) {
  let key = array.join(',');

  if (key in memo) {
    // if this key has already been parsed, return the result
    return memo[key];
  }

  let result = 1;
  for (let i=1; i<array.length-1; i++) {
    // if the next element minus the previous element is <= 3, then its ok to remove this item
    if (array[i+1]-array[i-1] <= 3) {
      // here we are building a new array from arr[0] to arr[i] (not included)
      // and adding on an array from arr[i+1] to the end
      // let arr2 = array.slice(i-1).concat(array.slice(i+1));
      let arr2 = [array[i-1]].concat(array.slice(i+1));
      result += combination(arr2, memo); 
    }
  }
  memo[key] = result;
  return result;
}

console.log(combination(lines));