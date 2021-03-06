const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(`\n\n`);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split('\n\n');

let total = 0;

input.forEach((group,groupIdx) => {
  let questions = [];
  group.split(/\n/).forEach((member) => {
    [...member].forEach(answer => {
      if (questions.indexOf(answer) === -1) {
        questions.push(answer);
      }
    })
  })
  total += questions.length;
})

console.log(total)