const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let xMas = lines;

const PREAMBLE = 25;

let weakness = findWeakness(lines)

function canSum(arr, target) {
  let included = arr.filter(number => {
    let difference = `${target - number}`;
    if (arr.indexOf(difference) !== -1 && arr[arr.indexOf(difference)] !== number) {
      return true;
    } else {
      return false;
    }
  })
  return included.length > 0;
}

function findWeakness(lines) {
  let idx = PREAMBLE;
  let finished = false;

  while (!finished && idx < xMas.length) {
    let previous = xMas.slice(idx - PREAMBLE, idx)

    let currentNumber = xMas[idx];

    if (!canSum(previous, currentNumber)) {
      finished = true;
      return currentNumber
    }
    idx++;
  }
}

console.log(weakness)