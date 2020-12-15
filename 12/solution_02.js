const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let coords = {
  "north":0,
  "south":0,
  "east":0,
  "west":0,
}

let waypoint = {
  "north": 1,
  "south": 0,
  "east": 10,
  "west": 0
};

lines.forEach(line => {
  let regex = /(?<instruction>\D{1})(?<distance>\d+)/
  let {groups: data} = regex.exec(line);
  console.log("coords before", coords)
  console.log("data",data)
  
  if (data.instruction === "N") {
    waypoint["north"] += Number(data.distance);
  } else if (data.instruction === "S") {
    waypoint["south"] += Number(data.distance);
  } else if (data.instruction === "E") {
    waypoint["east"] += Number(data.distance);
  } else if (data.instruction === "W") {
    waypoint["west"] += Number(data.distance);
  } else if (data.instruction === "L") {
    let degrees = Number(data.distance);

    if (degrees === 90) {
      let {north,south,east,west} = waypoint;
      waypoint["north"] = east;
      waypoint["south"] = west;
      waypoint["east"] = south;
      waypoint["west"] = north;
    } else if (degrees === 180) {
      let {north,south,east,west} = waypoint;
      waypoint["north"] = south;
      waypoint["south"] = north;
      waypoint["east"] = west;
      waypoint["west"] = east;
    } else if (degrees === 270) {
      let {north,south,east,west} = waypoint;
      waypoint["north"] = west;
      waypoint["south"] = east;
      waypoint["east"] = north;
      waypoint["west"] = south;
    }

  } else if (data.instruction === "R") {
    let degrees = Number(data.distance);
    
    if (degrees === 90) {
      let {north,south,east,west} = waypoint;
      waypoint["north"] = west;
      waypoint["south"] = east;
      waypoint["east"] = north;
      waypoint["west"] = south;
    } else if (degrees === 180) {
      let {north,south,east,west} = waypoint;
      waypoint["north"] = south;
      waypoint["south"] = north;
      waypoint["east"] = west;
      waypoint["west"] = east;
    } else if (degrees == 270) {
      let {north,south,east,west} = waypoint;
      waypoint["north"] = east;
      waypoint["south"] = west;
      waypoint["east"] = south;
      waypoint["west"] = north;
    }

  } else {
    for (let coord in coords) {
      if (waypoint[coord] > 0) {
        coords[coord] += waypoint[coord] * Number(data.distance);
      }
    }
  }
  console.log("coords after", coords)
})

let y = Math.abs(coords["south"] - coords["north"]);
let x = Math.abs(coords["east"] - coords["west"]);

console.log(y + x)