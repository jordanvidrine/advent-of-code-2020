const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(`\n\n`);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split('\n\n');

let total = 0;

input.forEach((group,groupIdx) => {
  let questions = {};
  group.split(/\n/).forEach((member) => {
    [...member].forEach(answer => {
      if (!questions[answer]) {
        questions[answer] = 1;
      } else {
        questions[answer]++;
      }
    })
  })
  
  for (let answer in questions) {
    // check if yes' === group length
    if (questions[answer] === group.split(/\n/).length) {
      total++;
    }
  }
})

console.log(total)