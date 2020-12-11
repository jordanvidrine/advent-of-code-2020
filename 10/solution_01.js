const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

lines = lines.sort((a,b) => {
  return a - b;
})

let differences = {
  1: 0,
  3: 1
}

if (Number(lines[0]) - 0 === 1) differences[1]++;

lines.forEach((value,idx) => {
  let nextNum = Number(lines[idx+1]);
  let currentNum = Number(value);
  let diff = nextNum - currentNum;

  if (diff === 3) {
    differences[3]++;
  } else if (diff === 1) {
    differences[1]++;
  }

})

console.log(differences[1] * differences[3]);