const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let beforeArray = [...testLines];
let afterArray = [];

let hasChanged = true;

while (hasChanged) {

  for (let y = 0; y < beforeArray.length; y++) {
    let line = beforeArray[y];

    if (beforeArray[y] === "#.##.##.L#" && y == 0) debugger;

    for (let x = 0; x < line.length; x++) {
      let seat = line.charAt(x);

      if (seat !== "." && seat !== "") {
        let empty = 0
        let occupied = 0
        // build seats array depending on where at in beforeArray
        if (beforeArray[y-1] === undefined) {
          //right
          for (let xX = x+1; xX <= line.length - 1; xX++) {
            let seat = beforeArray[y].charAt(xX);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //down-right
          for (let yY = y+1; yY <= beforeArray.length - 1; yY++) {
            let xX = x + (yY - y);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          //down
          for (let yY = y+1; yY <= beforeArray.length - 1; yY++) {
            let seat = beforeArray[yY].charAt(x);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //down-left
          for (let yY = y+1; yY <= beforeArray.length - 1; yY++) {
            let xX = x - (yY - y);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          //left
          for (let xX = x-1; xX <= line.length - 1; xX++) {
            let seat = beforeArray[y].charAt(xX);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
        } else if (beforeArray[y-1] && beforeArray[y+1]) {
          // up
          for (let yY = y-1; yY >= 0; yY--) {
            let seat = beforeArray[yY].charAt(x);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //up-right
          for (let yY = y-1; yY >= 0; yY--) {
            let xX = x + (y - yY);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          //right
          for (let xX = x+1; xX <= line.length - 1; xX++) {
            let seat = beforeArray[y].charAt(xX);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //down-right
          for (let yY = y+1; yY <= beforeArray.length - 1; yY++) {
            let xX = x + (yY - y);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          //down
          for (let yY = y+1; yY <= beforeArray.lenth - 1; yY++) {
            let seat = beforeArray[yY].charAt(x);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //down-left
          for (let yY = y+1; yY <= beforeArray.length - 1; yY++) {
            let xX = x - (yY - y);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          //left
          for (let xX = x-1; xX >= 0; xX--) {
            let seat = beforeArray[y].charAt(xX);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //up-left
          for (let yY = y-1; yY >= 0; yY--) {
            let xX = x - (y - yY);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          // up
          for (let yY = y-1; yY >= 0; yY--) {
            let seat = beforeArray[yY].charAt(x);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
        } else {
          //left
          for (let xX = x-1; xX >= 0; xX--) {
            let seat = beforeArray[y].charAt(xX);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //up-left
          for (let yY = y-1; yY >= 0; yY--) {
            let xX = x - (y - yY);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          // up
          for (let yY = y-1; yY >= 0; yY--) {
            let seat = beforeArray[yY].charAt(x);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
          //up-right
          for (let yY = y-1; yY >= 0; yY--) {
            let xX = x + (y - yY);
            let seat = beforeArray[yY].charAt(xX);
            if (seat !== "." && seat !== "") {
                seat === "#" ? occupied++ : empty++;
                break;
            }
          }
          //right
          for (let xX = x+1; xX <= line.length - 1; xX++) {
            let seat = beforeArray[y].charAt(xX);
            if (seat !== "." && seat !== "") {
              seat === "#" ? occupied++ : empty++
              break;
            }
          }
        }
  
        if (seat === "L" && occupied === 0) {
          line = [].concat(line.split("").slice(0,x)).concat("#").concat(line.split("").slice(x+1)).join("");
        } else if (seat === "#" && occupied >= 5 ) {
          line = [].concat(line.split("").slice(0,x)).concat("L").concat(line.split("").slice(x+1)).join("");
        }
      }
    }
    afterArray.push(line);
  }

  let before = beforeArray.join('');
  let after = afterArray.join('');

  console.log(afterArray)

  if (before === after) {
    let occupiedSeats = [...after].filter(seat => seat === "#");
    console.log(occupiedSeats.length)
    hasChanged = false;
  } else {
    beforeArray = afterArray;
    afterArray = [];
  }
}