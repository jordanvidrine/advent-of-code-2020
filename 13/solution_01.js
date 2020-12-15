const TIME = 1008169;
const BUSSES = [29,41,37,653,13,17,23,823,19];

let done = false;

for (let timestamp = TIME; done == false; timestamp++) {
  BUSSES.forEach(id => {
    let diff = timestamp % id;

    if (diff == 0) {
      console.log(id * (timestamp - TIME))
      done = true;
    }
  })
}