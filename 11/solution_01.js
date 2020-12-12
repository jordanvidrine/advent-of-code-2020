const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let beforeArray = [...testLines];
let afterArray = [];

let hasChanged = true;

while (hasChanged) {

  for (let y = 0; y < beforeArray.length; y++) {
    let line = beforeArray[y];

    for (let x = 0; x < line.length; x++) {
      let seat = line.charAt(x);

      if (seat !== ".") {
        let seats;
        // build seats array depending on where at in beforeArray
        if (beforeArray[y-1] === undefined) {
          seats = [
            beforeArray[y].charAt(x+1),
            beforeArray[y+1].charAt(x+1),
            beforeArray[y+1].charAt(x),
            beforeArray[y+1].charAt(x-1),
            beforeArray[y].charAt(x-1)
          ].filter(seat => seat === "#");
        } else if (beforeArray[y-1] && beforeArray[y+1]) {
          seats = [
            beforeArray[y-1].charAt(x-1),
            beforeArray[y-1].charAt(x),
            beforeArray[y-1].charAt(x+1),
            beforeArray[y].charAt(x+1),
            beforeArray[y+1].charAt(x+1),
            beforeArray[y+1].charAt(x),
            beforeArray[y+1].charAt(x-1),
            beforeArray[y].charAt(x-1)
          ].filter(seat => seat === "#");
        } else {
          seats = [
            beforeArray[y-1].charAt(x-1),
            beforeArray[y-1].charAt(x),
            beforeArray[y-1].charAt(x+1),
            beforeArray[y].charAt(x+1),
            beforeArray[y].charAt(x-1)
          ].filter(seat => seat === "#");
        }
  
        if (seat === "L" && seats.length === 0) {
          line = [].concat(line.split("").slice(0,x)).concat("#").concat(line.split("").slice(x+1)).join("");
        } else if (seat === "#" && seats.length >= 4 ) {
          line = [].concat(line.split("").slice(0,x)).concat("L").concat(line.split("").slice(x+1)).join("");
        }
      }
    }
    afterArray.push(line);
  }

  let before = beforeArray.join('');
  let after = afterArray.join('');

  if (before === after) {
    let occupiedSeats = [...after].filter(seat => seat === "#");
    console.log(occupiedSeats.length)
    hasChanged = false;
  } else {
    beforeArray = afterArray;
    afterArray = [];
  }
}