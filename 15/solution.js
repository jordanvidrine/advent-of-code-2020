// let input = [0,3,6]
let input = [6,19,0,5,7,13,1]

let numbers = {

}

let lastNumberSpoken = null;
let nextNumber = null;

input.forEach((number,idx) => {
    numbers[number] = {
      lastTurnCalled: idx+1,
      secondToLastTurnCalled: null,
    }
    lastNumberSpoken = number;
})

for (let turn = input.length+1; turn <= 30000000; turn++) {
  let number = null;

  if (numbers.hasOwnProperty(lastNumberSpoken)) {
    if (numbers[lastNumberSpoken].secondToLastTurnCalled) {
      number = numbers[lastNumberSpoken].lastTurnCalled - numbers[lastNumberSpoken].secondToLastTurnCalled;
    } else {
      number = turn - 1 - numbers[lastNumberSpoken].lastTurnCalled;
    }
  } else {
      numbers[lastNumberSpoken] = {
          number: lastNumberSpoken,
          lastTurnCalled: [turn-1],
      }
      number = 0;
  }

  if (numbers.hasOwnProperty(number)) {
    numbers[number].secondToLastTurnCalled = numbers[number].lastTurnCalled;
    numbers[number].lastTurnCalled = turn;
  }

  lastNumberSpoken = number;
}

console.log(lastNumberSpoken)