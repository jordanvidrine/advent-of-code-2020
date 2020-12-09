const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let xMas = lines;

const PREAMBLE = 25;

let weakness = Number(findWeakness(xMas))

function canSum(arr, target) {
    let included = arr.filter(number=>{
        let difference = `${target - number}`;
        if (arr.indexOf(difference) !== -1 && arr[arr.indexOf(difference)] !== number) {
            return true;
        } else {
            return false;
        }
    }
    )
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

function getRange(lines, weakness) {
  let finished = false;
  let i = 0;

  while (!finished) {
      debugger ;let sum = Number(lines[i]);
      let rangeIndexes = [Number(lines[i])];

      for (let j = i + 1; sum !== weakness && j < lines.length && sum < weakness; j++) {
          sum += Number(lines[j]);
          rangeIndexes.push(Number(lines[j]));
      }

      if (sum !== weakness) {
          i++;
      } else {
          finished = true;
          return rangeIndexes;
      }
  }
}

let range = getRange(xMas, weakness);

console.log(Math.max(...range) + Math.min(...range))