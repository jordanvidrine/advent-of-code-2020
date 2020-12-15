const BUSSES = [29,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",41,"x","x","x",37,"x","x","x","x","x",653,"x","x","x","x","x","x","x","x","x","x","x","x",13,"x","x","x",17,"x","x","x","x","x",23,"x","x","x","x","x","x","x",823,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",19];
// const BUSSES = [7,13,"x","x",59,"x",31,19]
// const BUSSES = [17,"x",13,19]
// const BUSSES = [67,7,59,61]
// const BUSSES = [67,"x",7,59,61]
// const BUSSES = [67,7,"x",59,61]
// const BUSSES = [1789,37,47,1889]

let busses = []

BUSSES.forEach((id,idx) => {
  if (id !== "x") {
    busses.push({id:id, forward:idx});
  }
})

console.log(busses)
let done = false;

let ids = [];

BUSSES.forEach(value => {
  if (value !== "x") {
    ids.push(value);
  }
})

let step = ids[0];

let t = step;

for (let j=1; j < ids.length; j++) {
  while((t+busses[j].forward) % busses[j].id !== 0) {
    t += step;
  }
  step *= busses[j].id;
}

console.log(t)

// OLD CODE it works... but takes FOREVER
// for (let timestamp = 0; done == false; timestamp+= increment) {
//   let isTimestamp = 0;
//   console.log("timestamp", timestamp)
//   requirements.forEach((value,key) => {
//     if ((timestamp + value) % key === 0) {
//       increment *= key;
//       isTimestamp++;
//     }
//   })
//   if (isTimestamp === requirements.size) {
//       done = true;
//       console.log(timestamp)
//     }
// }