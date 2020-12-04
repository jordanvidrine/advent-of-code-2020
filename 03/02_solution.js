const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split(/\r?\n/);

let map = input;
let maxWidth = input[0].length - 1;

let slopes = {
  0: {
    slope: [1,1],
    treeCount: 0
  },
  1: {
    slope: [3,1],
    treeCount: 0
  },
  2: {
    slope: [5,1],
    treeCount: 0
  },
  3: {
    slope: [7,1],
    treeCount: 0
  },
  4: {
    slope: [1,2],
    treeCount: 0
  }
}

let multipliedTreeCount = 1;

for (let curSlope in slopes) {
  // start at the 0,0 position on the map
  let curPos = [0,0];
  // get the current 'slope rules' for the moves
  let slope = slopes[curSlope]["slope"]

  // loop over the map
  for (let i = 0; i < map.length - 1; i = i + slope[1]) {
    let nextPos = [curPos[0] + slope[0], curPos[1] + slope[1]];

    // make sure we are not off the map
    if (nextPos[0] > maxWidth) {
      // if we are 'off map' subtract the width of the map
      // to mimic the "replication" horizontally
      nextPos[0] = nextPos[0] - maxWidth - 1;
    }
    // get the line of text for the current Y position on map
    let line = map[nextPos[1]];
    // check if the spot we land is a "#" (which is a tree)
    let isTree = line.charAt(nextPos[0]) === "#";

    if (isTree) {
      slopes[curSlope]["treeCount"]++;
    }
    // set curPos to where we landed
    curPos = nextPos;
  }
  // reset curPos to 0,0 to begin moves on new map
  curPos = [0,0];
  // get current multiplied tree count
  multipliedTreeCount = multipliedTreeCount * slopes[curSlope]["treeCount"]
}

console.log(multipliedTreeCount)