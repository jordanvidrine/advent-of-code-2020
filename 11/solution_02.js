const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);


let beforeArray = [...lines];
let afterArray = [];

function right(x,y,array) {
  if (x > array[0].length - 1) {
    return false;
  }

  let seat = array[y].charAt(x+1);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return right(x+1,y,array)
  }
}

function downRight(x,y,array) {
  if (x+1 > array[0].length - 1) {
    return false;
  }

  if (y+1 > array.length - 1) {
    return false;
  }

  let seat = array[y+1].charAt(x+1);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return downRight(x+1,y+1,array)
  }
}

// console.log(downRight(3,4,beforeArray))

function down(x,y,array) {
  if (y+1 > array.length - 1) {
    return false;
  }

  let seat = array[y+1].charAt(x);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return down(x,y+1,array)
  }
}

// console.log(down(3,4,beforeArray))

function downLeft(x,y,array) {
  if (x-1 < 0) {
    return false;
  }

  if (y+1 > array.length - 1) {
    return false;
  }

  let seat = array[y+1].charAt(x-1);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return downLeft(x-1,y+1,array)
  }
}

// console.log(downLeft(3,4,beforeArray))

function left(x,y,array) {
  if (x-1 < 0) {
    return false;
  }

  let seat = array[y].charAt(x-1);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return left(x-1,y,array)
  }
}

// console.log(left(3,4,beforeArray))

function upLeft(x,y,array) {
  if (x-1 < 0) {
    return false;
  }

  if (y-1 < 0) {
    return false;
  }

  let seat = array[y-1].charAt(x-1);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return upLeft(x-1,y-1,array)
  }
}

// console.log(upLeft(3,4,beforeArray))

function up(x,y,array) {
  if (y-1 < 0) {
    return false;
  }

  let seat = array[y-1].charAt(x);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return up(x,y-1,array)
  }
}

// console.log(up(3,4,beforeArray))

function upRight(x,y,array) {
  if (x+1 > array[0].length - 1) {
    return false;
  }

  if (y-1 < 0) {
    return false;
  }

  let seat = array[y-1].charAt(x+1);

  if (seat === "L") {
    return false;
  } else if (seat === "#") {
    return true;
  } else {
    return upRight(x+1,y-1,array)
  }
}

let hasChanged = true;

while (hasChanged) {

  for (let y = 0; y < beforeArray.length; y++) {
    let line = beforeArray[y];

    for (let x = 0; x < line.length; x++) {
      let seat = line.charAt(x);

      if (seat !== "." && seat !== "") {
        let empty = 0
        let occupied = 0
        // build seats array depending on where at in beforeArray
        if (beforeArray[y-1] === undefined) {
          //right
          if (right(x,y,beforeArray)) occupied++;

          //down-right
          if (downRight(x,y,beforeArray)) occupied++;

          //down
          if (down(x,y,beforeArray)) occupied++;

          //down-left
          if (downLeft(x,y,beforeArray)) occupied++;

          //left
          if (left(x,y,beforeArray)) occupied++;
 
        } else if (beforeArray[y-1] && beforeArray[y+1]) {
          // up
          if (up(x,y,beforeArray)) occupied++;

          //up-right
          if (upRight(x,y,beforeArray)) occupied++;

          //right
          if (right(x,y,beforeArray)) occupied++;
        
          //down-right
          if (downRight(x,y,beforeArray)) occupied++;

          //down
          if (down(x,y,beforeArray)) occupied++;
          
          //down-left
          if (downLeft(x,y,beforeArray)) occupied++;

          //left
          if (left(x,y,beforeArray)) occupied++;

          //up-left
          if (upLeft(x,y,beforeArray)) occupied++;

        } else {
          //left
          if (left(x,y,beforeArray)) occupied++;
          //up-left
          if (upLeft(x,y,beforeArray)) occupied++;
          // up
          if (up(x,y,beforeArray)) occupied++;
          //up-right
          if (upRight(x,y,beforeArray)) occupied++;
          //right
          if (right(x,y,beforeArray)) occupied++;
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
    hasChanged = false;
    console.log(occupiedSeats.length)
  } else {
    beforeArray = afterArray;
    afterArray = [];
  }
}