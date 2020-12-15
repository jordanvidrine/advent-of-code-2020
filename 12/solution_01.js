const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let coords = {
  "north":0,
  "south":0,
  "east":0,
  "west":0,
}

let direction = "east";

//     90
// 180    0
//    270

lines.forEach(line => {
  let regex = /(?<instruction>\D{1})(?<distance>\d+)/
  let {groups: data} = regex.exec(line);
  console.log("coords before", coords)
  console.log("data",data)
  
  if (data.instruction === "N") {
    coords["north"] += Number(data.distance);
  } else if (data.instruction === "S") {
    coords["south"] += Number(data.distance);
  } else if (data.instruction === "E") {
    coords["east"] += Number(data.distance);
  } else if (data.instruction === "W") {
    coords["west"] += Number(data.distance);
  } else if (data.instruction === "L") {
    let degrees = Number(data.distance);

    if (degrees === 90) {
      if (direction === "north") {
        direction = "west";
      } else if (direction === "south") {
        direction = "east";
      } else if (direction === "east") {
        direction = "north";
      } else {
        direction = "south";
      }
    } else if (degrees === 180) {
      if (direction === "north") {
        direction = "south";
      } else if (direction === "east") {
        direction = "west";
      } else if (direction === "south") {
          direction = "north"
      } else {
        direction = "east";
      }
    } else if (degrees === 270) {
      if (direction === "north") {
        direction = "east";
      } else if (direction === "east") {
        direction = "south";
      } else if (direction === "south") {
          direction = "west"
      } else {
        direction = "north";
      }
    }

  } else if (data.instruction === "R") {
    let degrees = Number(data.distance);
    
    if (degrees === 90) {
      if (direction === "north") {
        direction = "east";
      } else if (direction === "south") {
        direction = "west";
      } else if (direction === "east") {
        direction = "south";
      } else {
        direction = "north";
      }
    } else if (degrees === 180) {
      if (direction === "north") {
        direction = "south";
      } else if (direction === "east") {
        direction = "west";
      } else if (direction === "south") {
          direction = "north"
      } else {
        direction = "east";
      }
    } else if (degrees == 270) {
      if (direction === "north") {
        direction = "west";
      } else if (direction === "east") {
        direction = "north";
      } else if (direction === "south") {
          direction = "east"
      } else {
        direction = "south";
      }
    }

  } else {
    coords[direction] += Number(data.distance);
  }
  console.log("coords after", coords)
})

let y = coords["south"] - coords["north"];
let x = coords["east"] - coords["west"];

console.log(Math.abs(y + x))