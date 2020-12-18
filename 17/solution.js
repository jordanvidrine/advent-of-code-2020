const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

// needed help with this one
// i knew what I needed to do. but couldnt implement it without error
// once again went with https://dev.to/thibpat/solving-day-17-of-advent-of-code-2020-in-javascript-1jl9
// so GOOD!

let dimensions = {

}

lines.forEach((line,y) => {
  [...line].forEach((cube,x) => {
    dimensions[`${x},${y},0,0`] = cube === "#";
  })
})

function getActive(x,y,z,v,map) {
  let activeCubes = 0;
  for (let a = x-1; a <= x+1; a++) {
    for (let b = y-1; b <= y+1; b++) {
      for (let c = z-1; c <= z+1; c++) {
        for (let d = v-1; d <= v+1; d++) {
          // dont count current position
          if (a != x || b != y || c != z || d != v) {
            let isActive = dimensions[`${a},${b},${c},${d}`];
            if (isActive) {
              activeCubes++;
            }
          }
        } 
      }
    }
  }
  return activeCubes;
}

for (let turn = 0; turn < 6; turn++) {
  let newDimensions = {};
  // go through coords and see the min and max of
  // x y and z, we need to decrease and increase by one for each
  // while looping for each pass

  let minx = null;
  let miny = null;
  let minz = null;
  let minv = null;
  let maxx = null;
  let maxy = null;
  let maxz = null;
  let maxv = null;

  for (let coords in dimensions) {
    let [x,y,z,v] = coords.split(",").map(num => Number(num));
    if (x < minx) minx = x;
    if (y < miny) miny = y;
    if (z < minz) minz = z;
    if (v < minv) minv = v;
    if (x > maxx) maxx = x;
    if (y > maxy) maxy = y;
    if (z > maxz) maxz = z;
    if (v > maxv) maxv = v;
  }

  for (let x = minx - 1; x <= maxx + 1; x++) {
    for (let y = miny - 1; y <= maxy + 1; y++) {
      for (let z = minz - 1; z <= maxz + 1; z++) {
        for (let v = minv -1; v <= maxv + 1; v++) {
          let active = getActive(x,y,z,v,dimensions);
          let isActive = dimensions.hasOwnProperty(`${x},${y},${z},${v}`) ? dimensions[`${x},${y},${z},${v}`] : false
          if (isActive && active != 2 && active !== 3) {
            newDimensions[`${x},${y},${z},${v}`] = false;
          } else if (!isActive && active === 3) {
            newDimensions[`${x},${y},${z},${v}`] = true;
          } else {
            newDimensions[`${x},${y},${z},${v}`] = isActive;
          }
        }
      }
    }
  }

  dimensions = newDimensions;

}

let count = 0;

for (let coord in dimensions) {
  if (dimensions[coord])count++
}

console.log(count);