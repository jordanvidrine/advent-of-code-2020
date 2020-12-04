// COULDNT SOLVE

const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split(/\r?\n/);

input.forEach((item,index,arr) => {
  arr[index] = Number(item);
})

let remaining1 = {};
let remaining2 = {};

for (var i = 0; i < input.length; i++) {
  remaining1[i] = 2020 - input[i];
  for (var j = i + 1; j < input.length; j++) {
    remaining2[j] = remaining1[i] - input[j];
    for (var k = j + 1; k < input.length; k++) {
      if (input[k] == remaining2[j]) {
        console.log(input[i], input[j], input[k]);
        console.log(input[i] * input[j] * input[k]);
      }
    }
  }
}