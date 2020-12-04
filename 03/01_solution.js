const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split(/\r?\n/);

let map = input;
let maxWidth = input[0].length - 1;

// x,y x= character at index of current row y= current row
// when y = height of map, exit

let slope = [3,1]
let curPos = [0,0]
let treeCount = 0;

let finished = false;

for (let i = 0; i < map.length - 1; i = i + slope[1]) {
  let nextPos = [curPos[0] + slope[0], curPos[1] + slope[1]];
  // make sure we are not off the map
  // if we are going to be subtract the width of the map
  // to mimic the "replication" horizontally
  if (nextPos[0] > maxWidth) {
    nextPos[0] = nextPos[0] - maxWidth - 1;
  }

  let line = map[nextPos[1]];

  let isTree = line.charAt(nextPos[0]) === "#";
  if (isTree) {
    treeCount++;
  }
  curPos = nextPos;
}

console.log(treeCount)






