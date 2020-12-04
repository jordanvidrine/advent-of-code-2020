const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split(/\r?\n/);

input.forEach(num => {
  let difference = 2020 - num;

  if (input.indexOf(`${difference}`) !== -1) {
    console.log(num*difference);
  }
})