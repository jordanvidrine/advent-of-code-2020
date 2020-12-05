const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = "BBFFBBFRLL";

const ROWS = 127;
const COLS = 7;

let seatIDs = [];

for (let pass = 0; pass < input.length; pass++) {
  let rowCode = [...input[pass]].splice(0,7);
  let rowRange = [0, ROWS];
  let assignedRow = null;

  let colCode = [...input[pass]].splice(7,3);
  let colRange = [0, COLS];
  let assignedCol = null;

  let seatID = null;

  // Row Loop
  for (let i = 0; i < rowCode.length; i++) {
    let diff = rowRange[1] - rowRange[0];
    let char = rowCode[i];
    if (char === "F") {
      rowRange = [rowRange[0], Math.floor((rowRange[1] - diff / 2))]
    } else {
      rowRange = [Math.ceil(rowRange[1] - diff / 2), rowRange[1]]
    }

    if (i === rowCode.length - 1) {
      assignedRow = char === "F" ? rowRange[0] : rowRange[1];
    }
  }

  // Column Loop
  for (let i = 0; i < colCode.length; i++) {
    let diff = colRange[1] - colRange[0];
    let char = colCode[i];
    if (char === "L") {
      colRange = [colRange[0], Math.floor((colRange[1] - diff / 2))]
    } else {
      colRange = [Math.ceil(colRange[1] - diff / 2), colRange[1]]
    }

    if (i === colCode.length - 1) {
      assignedCol = char === "L" ? colRange[0] : colRange[1];
      seatID = (assignedRow * 8) + assignedCol;
      seatIDs.push(seatID)
    }
  }
}

console.log(Math.max(...seatIDs))



