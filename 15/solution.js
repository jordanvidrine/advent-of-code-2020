// let input = [0,3,6]
let input = [6,19,0,5,7,13,1]

let numbers = {

}

let lastNumberSpoken = null;
let nextNumber = null;

input.forEach((number,idx) => {
    numbers[number] = {
      lastTurnCalled: [idx+1],
    }
    lastNumberSpoken = number;
})

for (let turn = input.length+1; turn <= 2020; turn++) {
  let number = null;

  if (numbers.hasOwnProperty(lastNumberSpoken)) {
    if (numbers[lastNumberSpoken].lastTurnCalled.length >= 2) {
      let length = numbers[lastNumberSpoken].lastTurnCalled.length;
      let previousTurnCalled = numbers[lastNumberSpoken].lastTurnCalled[length - 2];
      let lastTurnCalled = numbers[lastNumberSpoken].lastTurnCalled[length - 1];
      number = lastTurnCalled - previousTurnCalled;
    } else {
      number = 0;
    }
  } else {
      numbers[lastNumberSpoken] = {
          number: lastNumberSpoken,
          lastTurnCalled: [turn-1],
      }
      number = 0;
  }

  if (numbers.hasOwnProperty(number)) {
    numbers[number].lastTurnCalled = [...numbers[number].lastTurnCalled, turn];
  }

  lastNumberSpoken = number;
}

console.log(lastNumberSpoken)